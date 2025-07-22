const { execSync } = require('child_process');
const baseConfig = require('./wdio.conf.js');

// Helper to handle the System UI crash dialog
const handleSystemUIDialog = async () => {
  try {
    const closeButton = await $('android=new UiSelector().text("Close app")');
    if (await closeButton.isDisplayed()) {
      console.warn('⚠️ System UI crash dialog found. Clicking "Close app"...');
      await browser.pause(500);
      await closeButton.click();
      await browser.pause(3000);
    }
  } catch {
    // no dialog present
  }
};

// CI-specific overrides and hooks
const ciConfig = {
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '14',
    'appium:autoGrantPermissions': true,
    'appium:noReset': true,
    'appium:autoLaunch': false, // tests will manually launch apps
    'appium:newCommandTimeout': 1800,
    app: process.env.apk_CI_PATH,              // WILLMA Trainer APK
    'appium:appPackage': 'com.willma.staging',
    'appium:appActivity': 'com.willma.staging.MainActivity',
  }],

  onPrepare() {
    console.log('📦 onPrepare: cleaning up before Appium starts');
    try { execSync('adb shell pkill -f uiautomator', { stdio: 'ignore' }); } catch {}
  },

  beforeTest: async function () {
    // Only handle System UI crash dialogs before each test
    await handleSystemUIDialog();
  },

  afterTest: async function (test, context, { error }) {
    try {
      if (browser && browser.sessionId) {
        const safeName = test.title.replace(/[^a-zA-Z0-9]/g, '_');
        await browser.saveScreenshot(`./diagnostics/${safeName}.png`);
      }
    } catch (err) {
      console.warn(`❌ Skipped screenshot: ${err.message}`);
    }
  },

  specFileRetries: 1,
};

// Merge with base WDIO config
exports.config = { ...baseConfig.config, ...ciConfig };
