// wdio.ci.conf.js
const { execSync } = require('child_process');
const fs         = require('fs');
const path       = require('path');
const baseConfig = require('./wdio.conf.js').config;

//
// CI overrides:
//
const ciConfig = {
  //
  // Run one instance at a time:
  //
  maxInstances: 1,

  //
  // Point at your APK(s), but don't auto‑launch:
  //
  capabilities: [{
    platformName:           'Android',
    'appium:automationName':'UiAutomator2',
    'appium:deviceName':    'emulator-5554',
    'appium:platformVersion':'14',
    'appium:autoGrantPermissions': true,
    'appium:noReset':       false,
    'appium:fullReset':     true,
    'appium:autoLaunch':    false,
    'appium:newCommandTimeout': 1800,
    'appium:adbExecTimeout':    60000,
    // you can mount both APKs here but only one will be launched
    'appium:app': process.env.TEST_TARGET === 'client'
      ? './appclient.apk'
      : './app-release-trainer.apk',
  }],

  connectionRetryTimeout: 120_000,
  connectionRetryCount:   3,
  specFileRetries:        1,

  //
  // before Appium launches, clear any stray uiAutomator:
  //
  onPrepare() {
    console.log('📦 onPrepare: cleaning up before Appium starts');
    try {
      execSync('adb shell pkill -f uiautomator', { stdio: 'ignore' });
    } catch {}
    // ensure diagnostics folder exists
    const diagDir = path.join(__dirname, 'diagnostics');
    if (!fs.existsSync(diagDir)) {
      fs.mkdirSync(diagDir, { recursive: true });
    }
  },

  //
  // Handle a System UI crash dialog if it pops up:
  //
  beforeTest: async function () {
    try {
      const closeBtn = await $('android=new UiSelector().text("Close app")');
      if (await closeBtn.isDisplayed()) {
        console.warn('⚠️ System UI crash dialog found. Clicking…');
        await browser.pause(500);
        await closeBtn.click();
        await browser.pause(3000);
      }
    } catch { /* ignore if not there */ }
  },

  //
  // Always capture a screenshot on failure:
  //
  afterTest: async function (test, context, { error }) {
    if (error && browser.sessionId) {
      const safe = test.title.replace(/[^a-zA-Z0-9]/g, '_');
      await browser.saveScreenshot(`diagnostics/${safe}.png`);
    }
  },
};

exports.config = {
  ...baseConfig,
  ...ciConfig,
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
