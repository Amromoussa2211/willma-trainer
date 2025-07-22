const baseConfig = require('./wdio.conf.js');
const { execSync } = require('child_process');

const ciConfig = {
  specs: ['./test/specs/**/*.js'],
  maxInstances: 1,
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '14',
    'appium:appPackage': 'com.willma.staging',
    'appium:appActivity': 'com.willma.staging.MainActivity',
    'appium:app': process.env.apk_CI_PATH,
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 1800,
    'appium:androidDeviceReadyTimeout': 1200,
    'appium:avdLaunchTimeout': 300000,
    'appium:avdReadyTimeout': 300000,
  }],
  before: async function (capabilities) {
    try {
      const device = capabilities['appium:deviceName'];
      const pkg = capabilities['appium:appPackage'];
      execSync(`adb -s ${device} shell pm clear ${pkg}`, { stdio: 'inherit' });
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
exports.config = { ...baseConfig.config, ...ciConfig }; // ✅ This line is required

