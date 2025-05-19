const baseConfig = require('./wdio.conf.js');

const ciConfig = {
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Pixel_5_API_31',
    'appium:platformVersion': '31.0',
    "appium:appPackage": "com.willma.staging",
    "appium:appActivity": "com.willma.staging.MainActivity",
    'appium:app': './apps/app-release-trainer.apk',
    'appium:noReset': false,
    'appium:fullReset': true,
    'appium:autoGrantPermissions': true,
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