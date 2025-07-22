const { execSync } = require('child_process');
const baseConfig = require('./wdio.conf.js');

// Helper to handle the System UI crash dialog
const handleSystemUIDialog = async () => {
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

// CI-specific overrides and hooks
const ciConfig = {
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '14',
    'appium:disableSuppressAccessibilityService': true,
    'appium:autoGrantPermissions': true,
    'appium:noReset': false,
    'appium:fastReset': true,
    'appium:autoLaunch': true, // let Appium install & launch
    'appium:newCommandTimeout': 1800,
    'appium:androidDeviceReadyTimeout': 1200,
    'appium:avdLaunchTimeout': 300000,
    'appium:avdReadyTimeout': 300000,
    'appium:app': process.env.apk_CI_PATH, // ensure this is set in CI env
    'appium:appPackage': 'com.willma.staging',
    'appium:appActivity': 'com.willma.staging.MainActivity',
    'appium:appWaitPackage': 'com.willma.staging',
    'appium:appWaitActivity': 'com.willma.staging.MainActivity',
    'appium:appWaitDuration': 20000,
  }],

  onPrepare: function () {
    console.log('📦 onPrepare: cleaning up before Appium starts');
    try {
      execSync('adb shell pkill -f uiautomator', { stdio: 'ignore' });
      console.log('✅ Stale uiautomator processes killed');
    } catch {
      // nothing to kill
    }
  },

  beforeTest: async function () {
    // Clear app data for a fresh start
    try {
      execSync('adb -s emulator-5554 shell pm clear com.willma.staging');
      console.log('🧼 Cleared app data');
    } catch {
      console.warn('⚠️ Could not clear app data');
    }

    // Dismiss any system crash dialog
    await handleSystemUIDialog();

    // Confirm app is running
    try {
      const menuBtn = await $('android=new UiSelector().description("Menu")');
      await menuBtn.waitForDisplayed({ timeout: 15000 });
      console.log('✅ App is running');
    } catch (err) {
      console.error('❌ App did not start as expected:', err.message);
    }
  },

  specFileRetries: 1,
};

// Merge with base WDIO config
exports.config = { ...baseConfig.config, ...ciConfig };
