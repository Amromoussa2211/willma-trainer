const baseConfig = require('./wdio.conf.js');
const { execSync } = require('child_process');

// Helper to handle the System UI crash dialog
const handleSystemUIDialog = async () => {
  try {
    const closeButton = await $('android=new UiSelector().text("Close app")');
    if (await closeButton.isDisplayed()) {
      console.warn('⚠️ System UI crash dialog found. Clicking "Close app"...');
      await closeButton.click();
      await driver.pause(3000); // Give time to recover
    }
  } catch (err) {
    console.log('✅ No System UI dialog detected, continuing...');
  }
};


const ciConfig = {
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '14',
    'appium:disableSuppressAccessibilityService': true,
    "appium:appPackage": "com.willma.staging",
    "appium:appActivity": "com.willma.staging.MainActivity",
    'appium:app': process.env.apk_CI_PATH,
  },
  {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '14',
    "appium:appPackage": "com.client.app",
    "appium:appActivity": "com.client.app.MainActivity",
    'appium:app': process.env.appclient_path,
    'appium:noReset': false,
    'appium:fullReset': true,
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 1800,
   'appium:androidDeviceReadyTimeout': 1200,
      'appium:avdLaunchTimeout': 300000,
      'appium:avdReadyTimeout': 300000,
  }],
  before: async function () {
    try {
      execSync(
        'adb -s emulator-5554 shell pm clear com.willma.staging',
        { stdio: 'inherit' }
      );
    } catch (err) {
      console.error('Failed to clear app cache:', err);
    }

    // Handle System UI crash if shown
    await handleSystemUIDialog();
  },
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverScreenshotsReporting: false,
    }]
  ],
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 45000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  // Optional retries for flaky tests
  specFileRetries: 1,
};

exports.config = { ...baseConfig.config, ...ciConfig };
