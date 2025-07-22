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
    'appium:newCommandTimeout': 1800,
    'appium:androidDeviceReadyTimeout': 1200,
    'appium:avdLaunchTimeout': 300000,
    'appium:avdReadyTimeout': 300000,
    'appium:appPackage': 'com.willma.staging',
    'appium:appActivity': 'com.willma.staging.MainActivity',
    'appium:app': process.env.apk_CI_PATH,
  }],

  onPrepare: function () {
    try {
      execSync('adb shell pkill -f uiautomator', { stdio: 'ignore' });
    } catch {}
  },

  beforeTest: async function () {
    // clear app data
    try {
      execSync('adb -s emulator-5554 shell pm clear com.willma.staging');
    } catch {}
    // handle crash dialog before each test
    await handleSystemUIDialog();
  },

  // inherit reporters, framework, mochaOpts, specs from baseConfig
  specFileRetries: 1,
};

exports.config = { ...baseConfig.config, ...ciConfig };
