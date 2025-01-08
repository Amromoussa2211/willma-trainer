const ciConfig = {
    capabilities: [{
        platformName: "Android",
        "appium:deviceName": "emulator-5554", // Ensure this matches the emulator started in your workflow
        "appium:app": "./apps/app-release-v15-0.3.2-2024-12-25-18-13.apk", // Path to your APK
        "appium:appPackage": "com.willma.client.staging", // Verify this using `aapt dump badging`
        "appium:appActivity": "com.willma.client.staging.MainActivity", // Verify this using `aapt dump badging`
        "appium:automationName": "UiAutomator2", // Use UiAutomator2 for Android
        "appium:newCommandTimeout": 600, // Increase if tests take longer
        "appium:autoGrantPermissions": true, // Automatically grant permissions
        "appium:ignoreHiddenApiPolicyError": true, // Ignore hidden API restrictions
        "appium:noReset": true, // Don't reset app state between sessions
        "appium:fullReset": false, // Don't uninstall the app after tests
        "appium:skipDeviceInitialization": true, // Skip device initialization (set to false if issues occur)
        "appium:skipServerInstallation": true, // Skip server installation (set to false if issues occur)
        "appium:skipUnlock": false // Unlock the device before tests
    }],
    waitforTimeout: 60000, // Wait timeout for elements
    connectionRetryTimeout: 90000, // Retry timeout for connecting to Appium
    connectionRetryCount: 3 // Number of retries for connecting to Appium
};

exports.config = {
    ...require('./wdio.conf.js').config,
    ...ciConfig,
    hostname: 'localhost', // Appium server host
    port: 4723, // Appium server port
    path: '/', // Base path for Appium 2 (use '/wd/hub' if Appium is started with `--base-path /wd/hub`)
};