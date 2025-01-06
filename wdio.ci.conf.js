const ciConfig = {
    capabilities: [{
        platformName: "Android",
        "appium:deviceName": process.env.DEVICE_NAME || "emulator-5554",
        "appium:udid": process.env.DEVICE_NAME || "emulator-5554",
        "appium:app": './apps/app-release-v15-0.3.2-2024-12-25-18-13.apk',
        "appium:appPackage": "com.willma.client.staging",
        "appium:appActivity": "com.willma.client.staging.MainActivity",
        "appium:automationName": "UiAutomator2",
        "appium:newCommandTimeout": 120,
        "appium:autoGrantPermissions": true,
        "appium:ignoreHiddenApiPolicyError": true,
        "appium:noReset": true,
        "appium:fullReset": false,
        "appium:skipUnlock": true
    }]
};

exports.config = { ...require('./wdio.conf.js').config, ...ciConfig };
