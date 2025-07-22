const { execSync } = require('child_process');
const baseConfig = require('./wdio.conf.js');

// Helper to handle the System UI crash dialog
tconst handleSystemUIDialog = async () => {
  try {
    const closeButton = await $('android=new UiSelector().text("Close app")');
    if (await closeButton.isDisplayed()) {
      console.warn('⚠️ System UI crash dialog found. Clicking "Close app"...');
      await browser.pause(500);
      await closeButton.click();
      await browser.pause(3000);
    }
  } catch {
    // no dialog present
  }
};

// CI-specific overrides and hooks for installing both Trainer and Client APKs
const ciConfig = {
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '14',
    'appium:autoGrantPermissions': true,
    'appium:noReset': true,
    'appium:autoLaunch': false, // we'll manually launch in test
    'appium:newCommandTimeout': 1800,
    app: process.env.apk_CI_PATH,              // WILLMA Trainer APK
    'appium:appPackage': 'com.willma.staging',
    'appium:appActivity': 'com.willma.staging.MainActivity',
  }],

  onPrepare() {
    console.log('📦 onPrepare: cleaning up before Appium starts');
    try { execSync('adb shell pkill -f uiautomator', { stdio: 'ignore' }); } catch {}
  },

  beforeTest: async function () {
    const trainerApk = process.env.apk_CI_PATH;
    const clientApk  = process.env.appclient_path;
    if (!trainerApk || !clientApk) {
      throw new Error('❌ Missing required env vars: apk_CI_PATH and appclient_path');
    }

    // Install both APKs
    try {
      console.log('📥 Installing Trainer APK...');
      await browser.installApp(trainerApk);
      console.log('📥 Installing Client APK...');
      await browser.installApp(clientApk);
    } catch (e) {
      console.warn('⚠️ App install failed:', e.message);
    }

    // Clear both app data
    try {
      execSync('adb -s emulator-5554 shell pm clear com.willma.staging');
      execSync('adb -s emulator-5554 shell pm clear com.client.app');
    } catch {}

    // Dismiss System UI crash if present
    await handleSystemUIDialog();

    // Launch WILLMA Trainer - your tests' before() can switch to client
    try {
      console.log('🚀 Launching WILLMA Trainer');
      await browser.activateApp('com.willma.staging');
      console.log('✅ Trainer app active');
    } catch (e) {
      console.error('❌ Failed to launch Trainer app:', e.message);
    }
  },

  afterTest: async function (test, context, { error }) {
    try {
      if (browser && browser.sessionId) {
        const safeName = test.title.replace(/[^a-zA-Z0-9]/g, '_');
        await browser.saveScreenshot(`./diagnostics/${safeName}.png`);
      }
    } catch (err) {
      console.warn(`❌ Skipped screenshot: ${err.message}`);
    }
  },

  specFileRetries: 1,
};

// Merge with base WDIO config
exports.config = { ...baseConfig.config, ...ciConfig };
