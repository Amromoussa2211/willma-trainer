const localConfig = {
    capabilities: [{
      platformName: "Android",
      "appium:deviceName": "Google Pixel 5",  // Replace with your desired device
      "appium:platformVersion": "12.0",       // Replace with your desired Android version
      "appium:app": process.env.APK_PATH || './apps/app-release-v15-0.3.2-2024-12-25-18-13.apk',
      "appium:appPackage": "com.willma.client.staging",
      "appium:appActivity": "com.willma.client.staging.MainActivity",
      "appium:automationName": "UiAutomator2",
      "appium:newCommandTimeout": 120,
      "appium:autoGrantPermissions": true,
      "appium:noReset": true,
      "appium:fullReset": false,
  
      // BrowserStack-specific capabilities under "bstack:options"
      "bstack:options": {
        userName: process.env.BROWSERSTACK_USERNAME,
        accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
        debug: true,  // Enable debugging logs
        networkLogs: true,  // Enable network logs
        appiumLogs: true,  // Enable Appium logs
        deviceLogs: true,  // Enable device logs
        geoLocation: "US",  // Set geolocation (optional)
      }
    }]
  };
  
  exports.config = { ...require('./wdio.conf.js').config, ...localConfig };