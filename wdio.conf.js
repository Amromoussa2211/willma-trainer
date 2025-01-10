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
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 30000, // Increased from 15000 to 30000
    connectionRetryTimeout: 300000, // Increased from 200000 to 300000
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
      timeout: 360000,  // 6 minutes
      retries: 2,  // Retry failed tests up to 2 times
  },
    onPrepare: async function (config, capabilities) {
        console.log('Skipping device check and APK installation...');
        // Add any other setup logic here
    },
    afterTest: async function (test, context, { error }) {
        const screenshotDir = path.join(__dirname, 'screenshots');
        if (!fs.existsSync(screenshotDir)) {
          fs.mkdirSync(screenshotDir, { recursive: true });
        }
        if (error) {
          const fileName = path.join(screenshotDir, `${test.title.replace(/[^a-zA-Z0-9]/g, '_')}_FAILED.png`);
          await browser.saveScreenshot(fileName);
          console.log(`Screenshot saved: ${fileName}`);
          await allure.createAttachment('Failed Screenshot', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        }
      },
};