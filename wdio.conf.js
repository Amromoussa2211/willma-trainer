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
    maxInstances: 1, // Reduced for stability
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 15000, // Increased timeout
    connectionRetryTimeout: 200000, // Increased timeout
    connectionRetryCount: 2,
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
        timeout: 120000 // Increased Mocha timeout
    },
    onPrepare: async function (config, capabilities) { // Marked as async
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
        } else {
            console.log('APK is already installed.');
        }

        // Wait for emulator to boot
        for (let i = 0; i < 60; i++) {
            try {
                const bootCompleted = execSync(`adb shell getprop sys.boot_completed`).toString().trim();
                if (bootCompleted === '1') {
                    console.log('Emulator is fully booted.');
                    break;
                }
            } catch (error) {
                console.log('Waiting for emulator to boot...');
            }
            await new Promise(resolve => setTimeout(resolve, 5000)); // Allowed because onPrepare is async
        }
    },
    afterTest: async function (test, context, { error }) {
        const screenshotDir = path.join(__dirname, 'screenshots');
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }
        if (error) {
            const fileName = path.join(screenshotDir, `${test.title.replace(/[^a-zA-Z0-9]/g, '_')}_FAILED.png`);
            await browser.saveScreenshot(fileName);
            await allure.addAttachment('Failed Screenshot', fs.readFileSync(fileName), 'image/png');
        }
    },
};