const baseConfig = require('./wdio.conf.js');
const { execSync } = require('child_process');

const ciConfig = {
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '14',
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
    'appium:avdLaunchTimeout': 1200000,
    'appium:avdReadyTimeout': 1200000,
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
};

exports.config = { ...baseConfig.config, ...ciConfig };
