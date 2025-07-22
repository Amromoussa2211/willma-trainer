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
  } catch (err) {
    // no dialog present
  }
};

const ciConfig = {
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '14',
    'appium:disableSuppressAccessibilityService': true,
    'appium:autoGrantPermissions': true,
    'appium:noReset': false,
    'appium:fullReset': true,
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
  }],

  onPrepare: function () {
    console.log('📦 onPrepare: cleaning up before Appium starts');
    try {
      execSync('adb shell pkill -f uiautomator', { stdio: 'ignore' });
      console.log('✅ Stale uiautomator processes killed');
    } catch {}
  },

  beforeTest: async function () {
    // Clear app data to ensure fresh state
    try {
      execSync('adb -s emulator-5554 shell pm clear com.willma.staging');
      console.log('🧼 App data cleared');
    } catch {
      console.warn('⚠️ Could not clear app data');
    }

    // Dismiss any system crash dialog
    await handleSystemUIDialog();

    // Ensure the app is launched
    try {
      console.log('🚀 Launching app');
      await driver.launchApp();
    } catch (e) {
      console.error('❌ Failed to launch app:', e.message);
    }
  },

  // Inherit other settings (reporters, framework, specs, mochaOpts) from baseConfig
  specFileRetries: 1,
};

exports.config = { ...baseConfig.config, ...ciConfig };
