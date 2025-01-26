const localConfig = {
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'CPH1937',
      'appium:udid': '93bb1813',
      'appium:app': 'C:\\Users\\ZBOOK\\Desktop\\appium\\Trainer\\apps\\app-release-v4-0.3.0-2025-01-20-20-32.apk',
      'appium:noReset': true,
      'appium:fullReset': false,
      'appium:autoGrantPermissions': false,
      'appium:newCommandTimeout': 300,
      'appium:enforceAppInstall': false,
      'appium:newCommandTimeout': 600,  // Increased to 600 seconds (10 minutes)
      'appium:autoGrantPermissions': true,
      'appium:noReset': true,
      'appium:fullReset': false,
      "appium:ignoreHiddenApiPolicyError": true,
      'appium:skipServerInstallation': true,
      'appium:debug': true, // Enable Appium debug logs
      'appium:networkLogs': true, // Enable network logs
      'appium:appiumLogs': true, // Enable Appium server logs
      'appium:deviceLogs': true, // Enable device logs
    }
  ]
}; // <-- Added closing brace here

exports.config = { ...require('./wdio.conf.js').config, ...localConfig };