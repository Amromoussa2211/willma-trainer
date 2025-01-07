const ciConfig = {
    capabilities: [{
        platformName: "Android",
        "appium:deviceName": "emulator-5554",
        "appium:udid": "emulator-5554",
        "appium:app": "./apps/app-release.apk", // Ensure correct APK path
        "appium:appPackage": "com.willma.client.staging",
        "appium:appActivity": "com.willma.client.staging.MainActivity",
        "appium:automationName": "UiAutomator2",
        "appium:newCommandTimeout": 300,
        "appium:autoGrantPermissions": true,
        "appium:ignoreHiddenApiPolicyError": true,
        "appium:noReset": true,
        "appium:fullReset": false,
        "appium:skipDeviceInitialization": true,
        "appium:skipServerInstallation": true,
        "appium:skipUnlock": false
    }]
};

exports.config = {
    ...require('./wdio.conf.js').config,
    ...ciConfig,
    hostname: 'localhost', // Ensure the Appium server hostname
    port: 4723,            // Ensure the Appium server port
    path: '/',             // Use "/" for Appium 2.0
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3
};
