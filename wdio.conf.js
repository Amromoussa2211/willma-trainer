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
        console.log('📦 Preparing test environment');
    },
    afterTest: async function (test, context, { error }) {
    const screenshotDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    const fileName = path.join(screenshotDir, `${test.title.replace(/[^a-zA-Z0-9]/g, '_')}_${error ? 'FAILED' : 'PASSED'}.png`);

    try {
        // Check if browser session is alive
        const sessionActive = await browser.getSession();
        if (sessionActive) {
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
    } catch (err) {
        console.error(`❌ Failed to fetch logcat: ${err.message}`);
    }
}

    }
};
