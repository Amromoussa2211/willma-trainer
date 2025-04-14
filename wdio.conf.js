const { execSync } = require('child_process');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const allure = require('allure-commandline');

exports.config = {
    runner: 'local',
    hostname: 'localhost',
    protocol: 'http',
    port: 4723,
    path: '/',
    specs: ['./test/specs/**/*.js'],
    exclude: [],
    maxInstances: 1,
    logLevel: 'trace',
    bail: 0,
    waitforTimeout: 15000, // Increased from 15000 to 30000
    connectionRetryTimeout: 200000, // Increased from 200000 to 300000
    //connectionRetryCount: 2,
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 360000,  // 6 minutes
        retries: 2,  // Retry failed tests up to 2 times
    },
    // Define appiumLogDir
    appiumLogDir: './logs/appium',
    onPrepare: async function (config, capabilities) {
        console.log('Skipping device check and APK installation...');
        // Add any other setup logic here
    },
    afterTest: async function (test, context, { error }) {
        const screenshotDir = path.join(__dirname, 'screenshots');
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }

        // Generate a unique file name for the screenshot
        const status = error ? 'FAILED' : 'PASSED';
        const fileName = path.join(screenshotDir, `${test.title.replace(/[^a-zA-Z0-9]/g, '_')}_${status}.png`);

        try {
            // Take and save the screenshot
            await browser.saveScreenshot(fileName);
            console.log(`Screenshot saved: ${fileName}`);

            // Attach the screenshot to the Allure report (optional)
            await allure.createAttachment(`Screenshot (${status})`, Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        } catch (err) {
            console.error(`Failed to save screenshot: ${err.message}`);
        }
        const appiumLogFile = path.join(appiumLogDir, `appium_failure_${Date.now()}.log`);
        fs.writeFileSync(appiumLogFile, fs.readFileSync('appium.log'));
  
        // Capture device logs (logcat) on failure
        const deviceLogDir = path.join(__dirname, 'logs');
        const deviceLogFile = path.join(deviceLogDir, `device_failure_${Date.now()}.log`);
        execSync(`adb logcat -d -v time > ${deviceLogFile}`);
    },
};