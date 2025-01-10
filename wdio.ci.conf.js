// const localConfig = {
//   user: process.env.BROWSERSTACK_USERNAME,
//   key: process.env.BROWSERSTACK_ACCESS_KEY,

//   services: [
//     [
//       'browserstack',
//       {
//         browserstackLocal: true,
//       },
//     ],
//   ],

//   hostname: 'hub.browserstack.com',
//   protocol: 'https',
//   port: 443,

//   capabilities: [
//     {
//       platformName: 'Android',
//       'appium:deviceName': 'Google Pixel 5',
//       'appium:platformVersion': '12.0',
//       'appium:app': 'https://github.com/Amromoussa2211/client/releases/download/v1.0.0/app-release-v15-0.3.2-2024-12-25-18-13.apk',
//       'appium:appPackage': 'com.willma.client.staging',
//       'appium:appActivity': 'com.willma.client.staging.MainActivity',
//       'appium:automationName': 'UiAutomator2',
//       'appium:newCommandTimeout': 120,
//       'appium:autoGrantPermissions': true,
//       'appium:noReset': true,
//       'appium:fullReset': false,

//       'bstack:options': {
//         debug: true,
//         networkLogs: true,
//         appiumLogs: true,
//         deviceLogs: true,
//         geoLocation: 'US',
//         local: true,
//         localIdentifier: 'your_local_identifier', // Optional
//       },
//     },
//   ],
// };

// exports.config = { ...require('./wdio.conf.js').config, ...localConfig };

const ciConfig = {
  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'emulator-5554', // Use an emulator or cloud device
      'appium:platformVersion': '11', // Update to match the emulator's Android version
      'appium:app': process.env.APK_PATH, // Ensure APK_PATH is set in your CI environment
      'appium:appPackage': 'com.willma.client.staging',
      'appium:appActivity': 'com.willma.client.staging.MainActivity',
      'appium:automationName': 'UiAutomator2',
      'appium:newCommandTimeout': 240, // Increased from 120 to 240 seconds
      'appium:autoGrantPermissions': true,
      'appium:noReset': true,
      'appium:fullReset': false,
    },
  ],
};

exports.config = { ...require('./wdio.conf.js').config, ...ciConfig };