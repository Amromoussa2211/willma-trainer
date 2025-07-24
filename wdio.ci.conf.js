// wdio.ci.conf.js
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const baseConfig = require('./wdio.conf.js').config;
const allure = require('allure-commandline');

// ─── APK SANITY CHECK ─────────────────────────────────────────────────────────
const TRAINER_APK = path.resolve(__dirname, 'app-release-trainer.apk');
const CLIENT_APK  = path.resolve(__dirname, 'appclient.apk');

[ TRAINER_APK, CLIENT_APK ].forEach(p => {
  console.log(`🔍 Checking for APK at ${p}`);
  if (!fs.existsSync(p)) {
    console.error(`❌ APK not found at ${p}!`);
    process.exit(1);
  }
});

// ─── MERGED CONFIG WITH RETAINED INSTRUMENTATION ──────────────────────────────
exports.config = {
  runner:   'local',
  hostname: 'localhost',
  port:     4723,
  protocol: 'http',
  path:     '/',

  specs:    ['./test/specs/**/*.js'],
  maxInstances: 1,

  capabilities: [{
    platformName:            'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName':     'emulator-5554',
    'appium:udid':           'emulator-5554',
    'appium:autoGrantPermissions': true,

    // KEEP instrumentation installed across specs:
    'appium:noReset':        true,
    'appium:fullReset':      false,

    // remove skip flags that prevent proper instrumentation installation

    'appium:autoLaunch':           false,
    'appium:newCommandTimeout':    1800,
    'appium:adbExecTimeout':       60000,
    'appium:waitForDeviceReadyTimeout': 300000,

    'appium:app': process.env.TEST_TARGET === 'client'
      ? CLIENT_APK
      : TRAINER_APK,
  }],

  logLevel: 'trace',
  bail:     0,
  waitforTimeout:         15000,
  connectionRetryTimeout: 200000,
  connectionRetryCount:   3,

  framework: 'mocha',
  mochaOpts: {
    ui:      'bdd',
    timeout: 360000,
    retries: 2,
  },

  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting:     false,
      disableWebdriverScreenshotsReporting: false,
    }]
  ],

  onPrepare: async function () {
    console.log('📦 onPrepare: killing stray processes');
    try { execSync('adb shell pkill -f uiautomator'); } catch {}
    [ 'diagnostics', 'screenshots', 'logs' ].forEach(dir => {
      const d = path.join(__dirname, dir);
      if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    });
  },

  beforeTest: async function () {
    // ensure each spec starts with fresh app state:
    await driver.reset();
    try {
      const btn = await $('android=new UiSelector().textContains("Close")');
      if (await btn.isDisplayed()) {
        console.warn('⚠️ Found crash dialog, clicking Close…');
        await browser.pause(500);
        await btn.click();
        await browser.pause(3000);
      }
    } catch {}
  },

  afterTest: async function (test, context, { error }) {
    const titleSafe = test.title.replace(/[^a-zA-Z0-9]/g, '_');
    const screenshotFile = path.join(__dirname, 'screenshots', `${titleSafe}_${error?'FAILED':'PASSED'}.png`);
    try {
      await browser.saveScreenshot(screenshotFile);
      const png = await browser.takeScreenshot();
      allure.createAttachment('Screenshot', Buffer.from(png, 'base64'), 'image/png');
      console.log(`📸 Screenshot saved to ${screenshotFile}`);
    } catch (err) {
      console.warn(`❌ WebDriver screenshot failed: ${err.message}`);
      try {
        const tmp = '/sdcard/failure.png';
        execSync(`adb shell screencap -p ${tmp}`);
        const local = path.join(__dirname, 'screenshots', `${titleSafe}_ADB.png`);
        execSync(`adb pull ${tmp} ${local}`);
        execSync(`adb shell rm ${tmp}`);
        console.log(`📸 Fallback ADB screenshot saved to ${local}`);
      } catch (adbErr) {
        console.error(`❌ ADB screencap fallback failed: ${adbErr.message}`);
      }
    }
    const logFile = path.join(__dirname, 'logs', `logcat_${Date.now()}.txt`);
    try {
      execSync(`adb logcat -d -v time > ${logFile}`);
      console.log(`📄 Logcat saved to ${logFile}`);
    } catch (err) {
      console.error(`❌ Failed to dump logcat: ${err.message}`);
    }
  },

  onComplete: async function () {
    console.log('📝 Generating Allure report…');
    return new Promise((res, rej) => {
      const gen = allure(['generate','allure-results','--clean']);
      gen.on('exit', code => code === 0 ? res() : rej(new Error('Allure generation failed')));
    });
  },
};


// const { execSync } = require('child_process');
// const fs = require('fs');
// const path = require('path');
// const baseConfig = require('./wdio.conf.js');

// // Helper to handle the System UI crash dialog
// const handleSystemUIDialog = async () => {
//   try {
//     const closeButton = await $('android=new UiSelector().text("Close app")');
//     if (await closeButton.isDisplayed()) {
//       console.warn('⚠️ System UI crash dialog found. Clicking "Close app"...');
//       await browser.pause(500);
//       await closeButton.click();
//       await browser.pause(3000);
//     }
//   } catch {
//     // no dialog present
//   }
// };

// // CI-specific overrides and hooks
// const ciConfig = {
//   maxInstances: 1,
//   capabilities: [{
//     platformName: 'Android',
//     'appium:automationName': 'UiAutomator2',
//     'appium:deviceName': 'emulator-5554',
//     'appium:platformVersion': '14',
//     'appium:autoGrantPermissions': true,
//     'appium:noReset': false,
//   "appium:fullrest": true, // ✅ if it's required by Appium (verify this)
//     'appium:autoLaunch': false, // tests will manually launch apps
//     'appium:newCommandTimeout': 1800,
//     'appium:adbExecTimeout': 60000,
//     'appium:app': process.env.apk_CI_PATH,              // WILLMA Trainer APK
//     'appium:appPackage': 'com.willma.staging',
//     'appium:appActivity': 'com.willma.staging.MainActivity',
//   }],

//   onPrepare() {
//     console.log('📦 onPrepare: cleaning up before Appium starts');
//     try { execSync('adb shell pkill -f uiautomator', { stdio: 'ignore' }); } catch {}
//     // ensure diagnostics folder exists
//     const diagDir = path.join(__dirname, 'diagnostics');
//     if (!fs.existsSync(diagDir)) fs.mkdirSync(diagDir, { recursive: true });
//   },

//   beforeTest: async function () {
//     // Only handle System UI crash dialogs before each test
//     await handleSystemUIDialog();
//   },

//   afterTest: async function (test, context, { error }) {
//     try {
//       const diagDir = path.join(__dirname, 'diagnostics');
//       if (!fs.existsSync(diagDir)) fs.mkdirSync(diagDir, { recursive: true });
//       if (browser && browser.sessionId) {
//         const safeName = test.title.replace(/[^a-zA-Z0-9]/g, '_');
//         await browser.saveScreenshot(path.join(diagDir, `${safeName}.png`));
//       }
//     } catch (err) {
//       console.warn(`❌ Skipped screenshot: ${err.message}`);
//     }
//   },

//   connectionRetryTimeout: 120000,
//   connectionRetryCount: 3,
//   specFileRetries: 1,
// };

// // Merge with base WDIO config
// exports.config = { ...baseConfig.config, ...ciConfig };
