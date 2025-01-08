const ciConfig = {
    capabilities: [{
        platformName: "Android",
        "appium:deviceName": "emulator-5554",
        "appium:app": "./apps/app-release-v15-0.3.2-2024-12-25-18-13.apk",
        "appium:appPackage": "com.willma.client.staging",
        "appium:appActivity": "com.willma.client.staging.MainActivity",
        "appium:automationName": "UiAutomator2",
        "appium:newCommandTimeout": 600,
        "appium:autoGrantPermissions": true,
        "appium:ignoreHiddenApiPolicyError": true,
        "appium:noReset": true,
        "appium:fullReset": false,
        "appium:skipDeviceInitialization": true,
        "appium:skipServerInstallation": true,
        "appium:skipUnlock": false
    }],
    waitforTimeout: 60000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3
};

exports.config = {
    ...require('./wdio.conf.js').config,
    ...ciConfig,
    hostname: 'localhost',
    port: 4723,
    path: '/wd/hub',
};
