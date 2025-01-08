const ciConfig = {
    capabilities: [{
        platformName: "Android",
        "appium:deviceName": process.env.DEVICE_NAME || "emulator-5554", // Use environment variables for flexibility
        "appium:app": process.env.APK_PATH || "./apps/app-release-v15-0.3.2-2024-12-25-18-13.apk", // Dynamic APK path
        "appium:appPackage": "com.willma.client.staging", // Verify with `aapt dump badging`
        "appium:appActivity": "com.willma.client.staging.MainActivity", // Verify with `aapt dump badging`
        "appium:automationName": "UiAutomator2", 
        "appium:newCommandTimeout": 600,
        "appium:autoGrantPermissions": true,
        "appium:ignoreHiddenApiPolicyError": true,
        "appium:noReset": true,
        "appium:fullReset": false,
        "appium:skipDeviceInitialization": true,
        "appium:skipServerInstallation": true,
        "appium:skipUnlock": false,
        "appium:appWaitActivity": "*" // Wait for any activity during app launch
    }],
    waitforTimeout: 60000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3
};

exports.config = {
    ...require('./wdio.conf.js').config,
    ...ciConfig,
    hostname: process.env.APPIUM_HOST || 'localhost', // Default to localhost, override for remote Appium server
    port: process.env.APPIUM_PORT || 4723, // Default Appium port
    path: process.env.APPIUM_PATH || '/', // Default base path
    logLevel: 'error', // Set log level to reduce noise in CI
};
