const { execSync } = require('child_process');
require('dotenv').config(); // Load environment variables
const path = require('path');
const fs = require('fs');
const allure = require('allure-commandline');

exports.config = {
    runner: 'local',
    hostname: 'localhost',
    protocol: 'http',
    port: 4723, // Default Appium port
    path: '/',
    specs: ['./test/specs/**/*.js'],
    exclude: [],
    maxInstances: 10,
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 150000, // Increase timeout
    connectionRetryCount: 1,
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
        timeout: 60000
    },
    onPrepare: function (config, capabilities) {
        console.log('Checking if the device is connected...');
        const devices = execSync('adb devices').toString();
        if (!devices.includes(capabilities[0]["appium:udid"])) {
            throw new Error(`Device with UDID ${capabilities[0]["appium:udid"]} is not connected.`);
        }
        console.log(`Device ${capabilities[0]["appium:udid"]} is connected.`);

        console.log('Checking if the APK is installed...');
        const installedPackages = execSync(`adb shell pm list packages`).toString();
        if (!installedPackages.includes(capabilities[0]["appium:appPackage"])) {
            console.log('APK is not installed. Installing...');
            execSync(`adb install ${capabilities[0]["appium:app"]}`, { stdio: 'inherit' });
        }
        console.log(`APK ${capabilities[0]["appium:appPackage"]} is installed.`);
    },
    afterTest: async function (test, context, { error, result }) {
        const screenshotDir = path.join(__dirname, 'screenshots');
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }
        const fileName = path.join(screenshotDir, `${test.title.replace(/[^a-zA-Z0-9]/g, '_')}_${result ? 'PASSED' : 'FAILED'}.png`);
        await browser.saveScreenshot(fileName);
        await allure.addAttachment('Screenshot', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
    }
};