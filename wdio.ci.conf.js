const ciConfig = {
    capabilities: [{
        platformName: "Android",
        "appium:deviceName": "emulator-5554",
        "appium:udid": "emulator-5554",
        "appium:app": "/home/runner/work/client/client/apps/app-release-v15-0.3.2-2024-12-25-18-13.apk",
        "appium:appPackage": "com.willma.client.staging",
        "appium:appActivity": "com.willma.client.staging.MainActivity",
        "appium:automationName": "UiAutomator2",
        "appium:newCommandTimeout": 300,
        "appium:autoGrantPermissions": true,
        "appium:ignoreHiddenApiPolicyError": true,
        "appium:noReset": true,
        "appium:fullReset": false,
        "appium:skipDeviceInitialization": true,  // Match local config
        "appium:skipServerInstallation": true,   // Match local config
        "appium:skipUnlock": false               // Match local config
    }]
};

exports.config = { ...require('./wdio.conf.js').config, ...ciConfig };