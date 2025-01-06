const localConfig = {
    capabilities: [{
        platformName: "Android",
        "appium:deviceName": process.env.DEVICE_NAME || "CPH1937",
        "appium:udid": process.env.UDID || "93bb1813",
        "appium:app": process.env.APK_PATH || './apps/app-release-v15-0.3.2-2024-12-25-18-13.apk',
        "appium:appPackage": "com.willma.client.staging",
        "appium:appActivity": "com.willma.client.staging.MainActivity",
        "appium:automationName": "UiAutomator2",
        "appium:newCommandTimeout": 120,
        "appium:autoGrantPermissions": true,
        "appium:ignoreHiddenApiPolicyError": true,
        "appium:noReset": true,
        "appium:fullReset": false,
        "appium:skipDeviceInitialization": true,
        "appium:skipServerInstallation": true,
        "appium:skipUnlock": false
    }]
};

exports.config = { ...require('./wdio.conf.js').config, ...localConfig };