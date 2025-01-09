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



const localConfig = {
  runner: 'local',
  hostname: 'localhost', // Appium is running locally in the CI environment
  protocol: 'http',
  port: 4723, // Default Appium port
  path: '/', // Default Appium path for Appium 2.x
  specs: ['./test/specs/**/*.js'], // Path to your test specs
  exclude: [],
  maxInstances: 1, // Only one instance since we're using a single emulator
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 15000,
  connectionRetryTimeout: 200000,
  connectionRetryCount: 2,
  framework: 'mocha',
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: false,
      disableWebdriverScreenshotsReporting: false,
    }],
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },

  services: [
    ['appium', {
      command: 'appium', // Use the globally installed Appium
      args: {
        relaxedSecurity: true, // Allow certain Appium features
      },
    }],
  ],

  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'emulator-5554', // Use the emulator device name
      'appium:platformVersion': '12.0', // Match the emulator's Android version
      'appium:app': process.env.APK_PATH, // Use the APK path from the environment variable
      'appium:appPackage': 'com.willma.client.staging',
      'appium:appActivity': 'com.willma.client.staging.MainActivity',
      'appium:automationName': 'UiAutomator2',
      'appium:newCommandTimeout': 120,
      'appium:autoGrantPermissions': true,
      'appium:noReset': true,
      'appium:fullReset': false,
    },
  ],

  onPrepare: async function (config, capabilities) {
    console.log('Skipping device check and APK installation...');
    // Add any other setup logic here
  },

  afterTest: async function (test, context, { error }) {
    const screenshotDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    if (error) {
      const fileName = path.join(screenshotDir, `${test.title.replace(/[^a-zA-Z0-9]/g, '_')}_FAILED.png`);
      await browser.saveScreenshot(fileName);
      await allure.addAttachment('Failed Screenshot', fs.readFileSync(fileName), 'image/png');
    }
  },
};

exports.config = { ...require('./wdio.conf.js').config, ...localConfig };