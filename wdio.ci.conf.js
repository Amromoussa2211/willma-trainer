const baseConfig = require('./wdio.conf.js');

const ciConfig = {
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '14 ',
    "appium:appPackage": "com.willma.staging",
    "appium:appActivity": "com.willma.staging.MainActivity",
    'appium:app': process.env.apk_CI_PATH ,
    'appium:noReset': false,
    'appium:fullReset': true,
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 600,
    'appium:androidDeviceReadyTimeout': 1200,
    'appium:avdLaunchTimeout': 1200000,
    'appium:avdReadyTimeout': 1200000,
  }],
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