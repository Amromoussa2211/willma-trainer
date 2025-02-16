const localConfig = {
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'CPH1937',
      'appium:udid': '93bb1813',
      "appium:appPackage": "com.willma.staging",
      "appium:appActivity": "com.willma.staging.MainActivity",
      'appium:app': 'C:\\Users\\ZBOOK\\Desktop\\appium\\Trainer\\apps\\app-release-v13-0.3.4-2025-02-11-15-46.apk',
      'appium:noReset': true,
      'appium:fullReset': false,
      'appium:autoGrantPermissions': true,
      'appium:newCommandTimeout': 600, // Increased to 600 seconds (10 minutes)
      'appium:ignoreHiddenApiPolicyError': true,
      'appium:skipServerInstallation': true,
      'appium:debug': true, // Enable Appium debug logs
      'appium:networkLogs': true, // Enable network logs
      'appium:appiumLogs': true, // Enable Appium server logs
      'appium:deviceLogs': true, // Enable device logs
    }
  ]
};

exports.config = { ...require('./wdio.conf.js').config, ...localConfig };