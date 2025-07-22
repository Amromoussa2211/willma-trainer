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
   * 1. onPrepare:
   *    – Kill leftover UiAutomator sessions so we start clean.
   */
  onPrepare: function () {
    console.log('📦 onPrepare: killing stale uiautomator…');
    try {
      execSync('adb shell pkill -f uiautomator', { stdio: 'ignore' });
      console.log('✅ uiautomator processes killed');
    } catch (err) {
      console.warn('⚠️ no uiautomator to kill');
    }
  },

  /**
   * 2. beforeTest:
   *    – Clear app data
   *    – Dismiss any “Close app” crash dialogs before each test
   */
  beforeTest: async function () {
    // clear staging app
    try {
      execSync('adb -s emulator-5554 shell pm clear com.willma.staging');
    } catch (e) {
      console.warn('⚠️ could not clear app data:', e.message);
    }

    // handle system UI crash dialog
    try {
      const btn = await $('android=new UiSelector().textContains("Close")');
      if (await btn.isDisplayed()) {
        console.log('⚠️ Found crash dialog – clicking Close');
        await btn.click();
        await browser.pause(2000);
      }
    } catch {}
  },

  /**
   * 3. afterTest:
   *    – Screenshot if session still alive
   *    – Fallback to adb screencap if Appium screenshot fails
   *    – Collect `logcat` & ANR traces
   */
  afterTest: async function (test, context, { error }) {
    const timestamp = Date.now();
    const sanitized = test.title.replace(/[^a-zA-Z0-9]/g, '_');
    const screenshots = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshots)) fs.mkdirSync(screenshots, { recursive: true });

    const outPath = path.join(
      screenshots,
      `${sanitized}_${error ? 'FAILED' : 'PASSED'}_${timestamp}.png`
    );

    // Try Appium screenshot
    if (browser.sessionId) {
      try {
        await browser.saveScreenshot(outPath);
        allure.createAttachment('Screenshot', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
      } catch (screenshotErr) {
        console.warn('❌ Appium screenshot failed, falling back to adb:', screenshotErr.message);
        try {
          execSync(`adb exec-out screencap -p > ${outPath}`);
        } catch (adbErr) {
          console.error('❌ adb screencap also failed:', adbErr.message);
        }
      }
    } else {
      console.warn('⚠️ No active session – skipping Appium screenshot');
      // still attempt adb in case device is up
      try {
        execSync(`adb exec-out screencap -p > ${outPath}`);
      } catch {}
    }

    // Collect logs
    const logs = path.join(__dirname, 'logs');
    if (!fs.existsSync(logs)) fs.mkdirSync(logs, { recursive: true });

    try {
      execSync(`adb logcat -d -v time > ${path.join(logs, `logcat_${timestamp}.log`)}`);
      execSync(`adb shell cat /data/anr/traces.txt > ${path.join(logs, `anr_${timestamp}.txt`)}`);
    } catch (logErr) {
      console.warn('⚠️ Failed to collect logs:', logErr.message);
    }
  },

  /**
   * 4. onComplete:
   *    – Generate Allure report
   */
  onComplete: function () {
    console.log('📈 Generating Allure report…');
    const generation = allure(['generate', 'allure-results', '--clean']);
    return new Promise((res, rej) => {
      generation.on('exit', code => (code === 0 ? res() : rej(new Error('Allure report failed'))));
    });
  }
};


exports.config = { ...baseConfig.config, ...ciConfig };
