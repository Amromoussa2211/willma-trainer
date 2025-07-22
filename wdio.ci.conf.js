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
  capabilities: [
    // App Under Test: WILLMA Trainer
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'emulator-5554',
      'appium:platformVersion': '14',
      'appium:autoGrantPermissions': true,
      'appium:fastReset': true,
      'appium:autoLaunch': true,
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
    },
    // App Under Test: Client App
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'emulator-5554',
      'appium:platformVersion': '14',
      'appium:autoGrantPermissions': true,
      'appium:fastReset': true,
      'appium:autoLaunch': true,
      'appium:newCommandTimeout': 1800,
      'appium:androidDeviceReadyTimeout': 1200,
      'appium:avdLaunchTimeout': 300000,
      'appium:avdReadyTimeout': 300000,
      'appium:app': process.env.appclient_path,
      'appium:appPackage': 'com.client.app',
      'appium:appActivity': 'com.client.app.MainActivity',
      'appium:appWaitPackage': 'com.client.app',
      'appium:appWaitActivity': 'com.client.app.MainActivity',
      'appium:appWaitDuration': 20000,
    }
  ],

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
      execSync('adb -s emulator-5554 shell pm clear com.client.app');
      console.log('🧼 Cleared app data for both apps');
    } catch {
      console.warn('⚠️ Could not clear app data');
    }

    // Dismiss any system crash dialog
    await handleSystemUIDialog();

    // Confirm first app is running before switch
    try {
      const menuBtn = await $('android=new UiSelector().description("Menu")');
      await menuBtn.waitForDisplayed({ timeout: 15000 });
      console.log('✅ com.willma.staging app is running');
    } catch (err) {
      console.error('❌ com.willma.staging did not start as expected:', err.message);
    }

    // Switch to second app context
    try {
      console.log('🚀 Activating com.client.app');
      await driver.activateApp('com.client.app');
      const homeBtn = await $('android=new UiSelector().description("Home")');
      await homeBtn.waitForDisplayed({ timeout: 15000 });
      console.log('✅ com.client.app is running');
    } catch (err) {
      console.error('❌ com.client.app did not start as expected:', err.message);
    }
  },

  specFileRetries: 1,
};

// Merge with base WDIO config
exports.config = { ...baseConfig.config, ...ciConfig };
