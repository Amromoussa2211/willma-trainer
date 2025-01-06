const ciConfig = {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    capabilities: [{
        platformName: "Android",
        "appium:deviceName": "Google Pixel 5",
        "appium:app": process.env.BROWSERSTACK_APP_ID,
        "appium:automationName": "UiAutomator2",
        "appium:newCommandTimeout": 120,
        "appium:autoGrantPermissions": true,
        "appium:noReset": true
    }]
};

exports.config = { ...require('./wdio.conf.js').config, ...ciConfig };
