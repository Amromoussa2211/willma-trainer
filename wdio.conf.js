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
    waitforTimeout: 15000,
    connectionRetryTimeout: 200000,
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
        timeout: 360000,
        retries: 2
    },

    onPrepare: async function () {
        console.log('📦 Preparing test environment...');
        try {
            // Kill any stuck UIAutomator processes
            execSync('adb shell pkill -f uiautomator');
            console.log('✅ Killed old uiautomator sessions');
        } catch (err) {
            console.warn('⚠️ No uiautomator processes to kill or failed:', err.message);
        }
    },

    beforeTest: async function () {
        // Optionally reset app state or launch cleanly
    },

    afterTest: async function (test, context, { error }) {
        const screenshotDir = path.join(__dirname, 'screenshots');
        if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

        const fileName = path.join(
            screenshotDir,
            `${test.title.replace(/[^a-zA-Z0-9]/g, '_')}_${error ? 'FAILED' : 'PASSED'}.png`
        );

        try {
            const session = await browser.getSession();
            if (session) {
                await browser.saveScreenshot(fileName);
                await allure.createAttachment('Screenshot', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
            }
        } catch (err) {
            console.error(`❌ Skipped screenshot: App crashed or session closed: ${err.message}`);
        }

        const logDir = path.join(__dirname, 'logs');
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

        const logFile = path.join(logDir, `device_failure_${Date.now()}.log`);
        try {
            execSync(`adb logcat -d -v time > ${logFile}`);
            console.log('📄 ADB logs collected');
        } catch (err) {
            console.error(`❌ Failed to fetch logcat: ${err.message}`);
        }

        try {
            // Attempt to close error popup if found
            const closeBtn = await $('android=new UiSelector().textContains("Close")');
            if (await closeBtn.isDisplayed()) {
                await closeBtn.click();
                console.log('❗ Detected crash dialog and closed it');
            }
        } catch (e) {
            console.log('✅ No crash popup to handle');
        }
    },

    onComplete: async function () {
        const reportError = new Error('Could not generate Allure report');
        const generation = allure(['generate', 'allure-results', '--clean']);

        return new Promise((resolve, reject) => {
            generation.on('exit', function (exitCode) {
                exitCode !== 0 ? reject(reportError) : resolve();
            });
        });
    }
};
