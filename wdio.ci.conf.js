const { execSync } = require('child_process');
const baseConfig = require('./wdio.conf.js');

const handleSystemUIDialog = async () => {
  try {
    const closeButton   = await $('android=new UiSelector().text("Close app")');
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
    // WILLMA Trainer App
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'emulator-5554',
      'appium:platformVersion': '14',
      'appium:autoGrantPermissions': true,
      'appium:noReset': true,
      'appium:autoLaunch': false,   // tests will launch via startActivity
      'appium:newCommandTimeout': 1800,
      'appium:app': process.env.apk_CI_PATH,
      'appium:appPackage': 'com.willma.staging',
      'appium:appActivity': 'com.willma.staging.MainActivity',
    },
    // Client App
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'emulator-5554',
      'appium:platformVersion': '14',
      'appium:autoGrantPermissions': true,
      'appium:noReset': true,
      'appium:autoLaunch': false,
      'appium:newCommandTimeout': 1800,
      'appium:app': process.env.appclient_path,
      'appium:appPackage': 'com.client.app',
      'appium:appActivity': 'com.client.app.MainActivity',
    }
  ],

  onPrepare: function () {
    console.log('📦 onPrepare: cleaning up before Appium starts');
    try { execSync('adb shell pkill -f uiautomator', { stdio: 'ignore' }); } catch {}
  },

  beforeTest: async function () {
    // clear both apps' data
    try {
      execSync('adb -s emulator-5554 shell pm clear com.willma.staging');
      execSync('adb -s emulator-5554 shell pm clear com.client.app');
    } catch {}
    await handleSystemUIDialog();

    // Launch WILLMA Trainer
    try {
      console.log('🚀 Starting WILLMA Trainer: com.willma.staging/MainActivity');
      await driver.startActivity('com.willma.staging', 'com.willma.staging.MainActivity');
    } catch (e) {
      console.error('❌ Failed to start WILLMA Trainer:', e.message);
    }
  },

  specFileRetries: 1,
};

exports.config = { ...baseConfig.config, ...ciConfig };
