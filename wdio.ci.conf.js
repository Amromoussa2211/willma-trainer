const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const baseConfig = require('./wdio.conf.js');

// Helper to handle the System UI crash dialog
const handleSystemUIDialog = async () => {
  try {
    const closeButton = await $('android=new UiSelector().textContains("Close app")');
    if (await closeButton.waitForDisplayed({ timeout: 5000 })) {
      console.warn('⚠️ System UI crash dialog found. Clicking "Close app"...');
      await browser.pause(500);
      await closeButton.click();
      await browser.pause(3000);
    }
  } catch {
    // no dialog present
  }
};

exports.config = {
  ...baseConfig.config,

  // Limit to a single parallel instance in CI
  maxInstances: 1,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  specFileRetries: 1,

  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '14',
    'appium:autoGrantPermissions': true,
    'appium:noReset': true,
    'appium:fullRest': false,
    'appium:autoLaunch': false,
    'appium:newCommandTimeout': 1800,
    'appium:adbExecTimeout': 60000,
    'appium:app': process.env.apk_CI_PATH,
    'appium:appPackage': 'com.willma.staging',
    'appium:appActivity': 'com.willma.staging.MainActivity',
  }],

  onPrepare: () => {
    console.log('📦 onPrepare: cleaning up before Appium starts');
    try { execSync('adb shell pkill -f uiautomator', { stdio: 'ignore' }); } catch {}
    try { execSync('adb shell rm -f /sdcard/DCIM/Camera/*.png', { stdio: 'ignore' }); } catch {}
    try { execSync('adb shell screencap -p /sdcard/DCIM/Camera/onPrepare.png', { stdio: 'ignore' }); } catch {}

    ['diagnostics', 'screenshots', 'logs'].forEach(dir => {
      const d = path.join(__dirname, dir);
      if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    });
  },

  beforeTest: async () => {
    // Handle system crash dialog
    await handleSystemUIDialog();

    // Handle runtime permissions
    try {
      const allowBtn = await $('android=new UiSelector().text("Allow")');
      if (await allowBtn.waitForDisplayed({ timeout: 5000 })) {
        console.info('🔐 Runtime permission dialog found. Clicking "Allow"...');
        await browser.pause(500);
        await allowBtn.click();
        await browser.pause(1000);
      }
    } catch {
      // no permission dialog
    }
    try {
      const emailInput = await $('android=new UiSelector().resourceId("email-input")');
      if (await emailInput.waitForDisplayed({ timeout: 2000 })) {
        return;
      }
    } catch {
      // login screen not detected, proceed
    }

    // If already logged in, log out first
    try {
      // open the menu
      const menu = await $('android=new UiSelector().className("android.view.ViewGroup").instance(28)');
      if (await menu.waitForDisplayed({ timeout: 2000 })) {
        await menu.click();
      }
    } catch {
      // fallback via XPath
      try {
        const menuXPath = await $('//android.view.View[@content-desc="Menu"]/android.view.ViewGroup');
        if (await menuXPath.waitForDisplayed({ timeout: 2000 })) {
          await menuXPath.click();
        }
      } catch {}
    }
    
    try {
      // click 'Logout' and confirm
      await waitAndClick('accessibility id:Logout');
      await waitAndClick('accessibility id:Yes');
      console.log('✅ Logged out successfully');
    } catch {
      // no logout button found
    }
  },
  

  afterTest: async (test, context, { error }) => {
    const safeName = test.title.replace(/[^a-zA-Z0-9]/g, '_');
    const status = error ? 'FAIL' : 'PASS';
    const shotPath = path.join(__dirname, 'screenshots', `${safeName}_${status}.png`);
    try {
      await browser.saveScreenshot(shotPath);
      console.log(`📸 Screenshot saved: ${shotPath}`);
    } catch (e) {
      console.warn(`❌ Failed to save screenshot: ${e.message}`);
    }

    // Capture device logs
    try {
      const logFile = path.join(__dirname, 'logs', `logcat_${Date.now()}.txt`);
      execSync(`adb logcat -d -v time > ${logFile}`);
      console.log(`📄 Logcat dumped: ${logFile}`);
    } catch (e) {
      console.warn(`❌ Failed to dump logcat: ${e.message}`);
    }
  },

  onComplete: () => new Promise((resolve, reject) => {
    console.log('🎉 onComplete: generating Allure report');
    const generation = execSync('allure generate allure-results --clean');
    generation && resolve();
  }),
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
//     'appium:noReset': true,
//   "appium:fullrest": false, // ✅ if it's required by Appium (verify this)
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
