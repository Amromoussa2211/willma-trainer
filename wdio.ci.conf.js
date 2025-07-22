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

// CI-specific overrides and hooks for installing both Trainer and Client APKs
const ciConfig = {
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '14',
    'appium:autoGrantPermissions': true,
    'appium:noReset': true,
    'appium:autoLaunch': false, // we'll manually launch in test
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
    // 1️⃣ Validate Trainer APK path
    const trainerApk = process.env.apk_CI_PATH;
    if (!trainerApk) {
      throw new Error('❌ Missing required env var: apk_CI_PATH');
    }

    // 2️⃣ Install Trainer APK onto the emulator
    try {
      console.log('📥 Installing Trainer APK...');
      await browser.installApp(trainerApk);
    } catch (e) {
      console.warn('⚠️ Trainer install failed:', e.message);
    }

    // 3️⃣ Clear any existing Trainer app data for a clean state
    try {
      console.log('🧹 Clearing Trainer app data');
      execSync('adb -s emulator-5554 shell pm clear com.willma.staging');
    } catch {
      console.warn('⚠️ Could not clear Trainer app data');
    }

    // 4️⃣ Handle any System UI crash dialogs
    await handleSystemUIDialog();

    // 5️⃣ Launch the Trainer app (tests will start Client app as needed)
    try {
      console.log('🚀 Launching WILLMA Trainer');
      await browser.activateApp('com.willma.staging');
      console.log('✅ Trainer app active');
    } catch (e) {
      console.error('❌ Failed to launch Trainer app:', e.message);
    }
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
