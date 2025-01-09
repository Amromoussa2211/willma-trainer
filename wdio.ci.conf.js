const localConfig = {
  user: process.env.BROWSERSTACK_USERNAME, // BrowserStack username
  key: process.env.BROWSERSTACK_ACCESS_KEY, // BrowserStack access key

  services: [
      [
          'browserstack',
          {
              browserstackLocal: true, // Enable BrowserStack Local for local testing
          },
      ],
  ],

  hostname: 'hub.browserstack.com', // Use BrowserStack's hub
  protocol: 'https', // Use HTTPS for BrowserStack
  port: 443, // BrowserStack's port

  capabilities: [
      {
          platformName: 'Android',
          'appium:deviceName': 'Google Pixel 5', // Replace with your desired device
          'appium:platformVersion': '12.0', // Replace with your desired Android version
          'appium:app': "https://github.com/Amromoussa2211/client/releases/download/v1.0.0/app-release-v15-0.3.2-2024-12-25-18-13.apk", // Use the direct URL or `bs://<hashed_app_id>`
          'appium:appPackage': 'com.willma.client.staging',
          'appium:appActivity': 'com.willma.client.staging.MainActivity',
          'appium:automationName': 'UiAutomator2',
          'appium:newCommandTimeout': 120,
          'appium:autoGrantPermissions': true,
          'appium:noReset': true,
          'appium:fullReset': false,

          // BrowserStack-specific capabilities under "bstack:options"
          'bstack:options': {
              debug: true, // Enable debugging logs
              networkLogs: true, // Enable network logs
              appiumLogs: true, // Enable Appium logs
              deviceLogs: true, // Enable device logs
              geoLocation: 'US', // Set geolocation (optional)
              local: true, // Enable BrowserStack Local
          },
      },
  ],
};

exports.config = { ...require('./wdio.conf.js').config, ...localConfig };