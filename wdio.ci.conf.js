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
  
      // BrowserStack-specific capabilities
      "browserstack.user": process.env.BROWSERSTACK_USERNAME,
      "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY,
      "browserstack.debug": true,  // Enable debugging logs
      "browserstack.networkLogs": true,  // Enable network logs
      "browserstack.appiumLogs": true,  // Enable Appium logs
      "browserstack.deviceLogs": true,  // Enable device logs
      "browserstack.geoLocation": "US",  // Set geolocation (optional)
    }]
  };
  
  exports.config = { ...require('./wdio.conf.js').config, ...localConfig };