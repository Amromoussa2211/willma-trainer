const { execSync } = require('child_process');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const allure = require('allure-commandline');

exports.config = {
  runner: 'local',
  hostname: 'localhost',
  protocol: 'http',
  port: 4723,
  path: '/',
  
  specs: ['./test/specs/**/*.js'],
  maxInstances: 1,
  
  logLevel: 'trace',
  bail: 0,
  waitforTimeout: 15000,
  connectionRetryTimeout: 200000,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 360000,
    retries: 2
  },

  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: false,
      disableWebdriverScreenshotsReporting: false
    }]
  ],

  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '14',
    'appium:disableSuppressAccessibilityService': true,
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 1800,
    'appium:androidDeviceReadyTimeout': 1200,
    'appium:avdLaunchTimeout': 300000,
    'appium:avdReadyTimeout': 300000,
    appPackage: 'com.willma.staging',
    appActivity: 'com.willma.staging.MainActivity',
    app: process.env.apk_CI_PATH,
  }],

  /**
   * onPrepare: kill any stale UiAutomator2 processes before Appium starts
   */
  onPrepare: function () {
    console.log('📦 onPrepare: killing stale uiautomator…');
    try {
      execSync('adb shell pkill -f uiautomator', { stdio: 'ignore' });
      console.log('✅ uiautomator processes killed');
    } catch {
      console.warn('⚠️ no uiautomator to kill');
    }
  },

  /**
   * beforeTest: clear app data and dismiss any “Close app” crash dialog
   */
  beforeTest: async function () {
    try {
      execSync('adb -s emulator-5554 shell pm clear com.willma.staging');
    } catch {
      console.warn('⚠️ could not clear app data');
    }

    // Dismiss system crash dialog if it appears
    try {
      const btn = await $('android=new UiSelector().textContains("Close")');
      if (await btn.isDisplayed()) {
        console.log('⚠️ Found crash dialog – clicking Close');
        await btn.click();
        await browser.pause(2000);
      }
    } catch {
      // no dialog present
    }
  },

  /**
   * afterTest: capture screenshot (Appium or ADB fallback) and collect logs
   */
  afterTest: async function (test, context, { error }) {
    const ts = Date.now();
    const name = test.title.replace(/[^a-zA-Z0-9]/g, '_');
    const screenshotsDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });
    const screenshotPath = path.join(screenshotsDir, `${name}_${error ? 'FAILED' : 'PASSED'}_${ts}.png`);

    // Try Appium screenshot if session alive
    if (browser.sessionId) {
      try {
        await browser.saveScreenshot(screenshotPath);
        allure.createAttachment(
          'Screenshot',
          Buffer.from(await browser.takeScreenshot(), 'base64'),
          'image/png'
        );
      } catch (e) {
        console.warn('❌ Appium screenshot failed, falling back to adb:', e.message);
        try {
          execSync(`adb exec-out screencap -p > ${screenshotPath}`);
        } catch {
          console.error('❌ adb screencap fallback failed');
        }
      }
    } else {
      // Session dead—just try adb
      try {
        execSync(`adb exec-out screencap -p > ${screenshotPath}`);
      } catch {
        console.error('❌ adb screencap failed (no session)');
      }
    }

    // Collect device logs
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
    try {
      execSync(`adb logcat -d -v time > ${path.join(logsDir, `logcat_${ts}.log`)}`);
      execSync(`adb shell cat /data/anr/traces.txt > ${path.join(logsDir, `anr_${ts}.txt`)}`);
    } catch {
      console.warn('⚠️ log collection failed');
    }
  },

  /**
   * onComplete: generate Allure report
   */
  onComplete: function () {
    console.log('📈 Generating Allure report…');
    const generation = allure(['generate', 'allure-results', '--clean']);
    return new Promise((resolve, reject) => {
      generation.on('exit', code => code === 0 ? resolve() : reject(new Error('Allure report failed')));
    });
  }
};
