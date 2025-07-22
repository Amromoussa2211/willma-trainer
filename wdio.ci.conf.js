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
      await browser.pause(3000); // Give time to recover
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
    'appium:autoLaunch': false, // we'll launch manually in hook
    'appium:newCommandTimeout': 1800,
    'appium:androidDeviceReadyTimeout': 1200,
    'appium:avdLaunchTimeout': 300000,
    'appium:avdReadyTimeout': 300000,
    'appium:app': process.env.apk_CI_PATH,
    'appium:appPackage': 'com.willma.staging',
    'appium:appActivity': 'com.willma.staging.MainActivity',
    'appium:appWaitPackage': 'com.willma.staging',
    'appium:appWaitActivity': 'com.willma.staging.MainActivity',
    'appium:appWaitDuration': 20000,
    'appium:appWaitForLaunch': true,
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

    // Install and launch the app
    try {
      console.log('🚀 Installing and launching app');
      // Ensure APK is installed
      await driver.installApp(process.env.apk_CI_PATH);
      // Launch the app
      await driver.activateApp('com.willma.staging');
      // Wait for main element
      const menuBtn = await $('android=new UiSelector().description("Menu")');
      await menuBtn.waitForDisplayed({ timeout: 15000 });
      console.log('✅ App launched successfully');
    } catch (err) {
      console.error('❌ Failed to install/launch app:', err.message);
    }
  },

  specFileRetries: 1,
};

// Merge with base WDIO config
exports.config = { ...baseConfig.config, ...ciConfig };
