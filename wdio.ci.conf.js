const { execSync } = require('child_process');
const baseConfig = require('./wdio.conf.js');

// Handle System UI crash dialog if present
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
    // No crash dialog
  }
};

const ciConfig = {
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '14',
    'appium:autoGrantPermissions': true,
    'appium:noReset': true,
    'appium:autoLaunch': false, // We'll manually activate the app
    'appium:newCommandTimeout': 1800,
    app: process.env.apk_CI_PATH, // Trainer APK
    'appium:appPackage': 'com.willma.staging',
    'appium:appActivity': 'com.willma.staging.MainActivity',
  }],

  onPrepare() {
    console.log('📦 Cleaning up before test');
    try {
      execSync('adb shell pkill -f uiautomator', { stdio: 'ignore' });
    } catch (e) {}
  },

  beforeTest: async function () {
    console.log('📥 Installing Trainer and Client APKs');
    try {
      await driver.installApp(process.env.apk_CI_PATH);
      await driver.installApp(process.env.appclient_path);
    } catch (e) {
      console.warn('⚠️ Install failed:', e.message);
    }

    // Clear app data
    try {
      execSync('adb -s emulator-5554 shell pm clear com.willma.staging');
      execSync('adb -s emulator-5554 shell pm clear com.client.app');
    } catch {}

    // Handle crash dialogs
    await handleSystemUIDialog();

    // Launch Trainer app
    try {
      console.log('🚀 Launching WILLMA Trainer');
      await driver.activateApp('com.willma.staging');
      console.log('✅ Trainer app active');
    } catch (e) {
      console.error('❌ Failed to launch Trainer app:', e.message);
    }

    // Launch Client app
    try {
      console.log('🔁 Switching to Client App');
      await driver.activateApp('com.client.app');
      console.log('✅ Client app active');
    } catch (e) {
      console.error('❌ Failed to switch to Client app:', e.message);
    }
  },

  afterTest: async function (test, context, { error }) {
    try {
      if (browser && browser.sessionId) {
        const fileName = `./diagnostics/${test.title.replace(/\s+/g, '_')}.png`;
        await browser.saveScreenshot(fileName);
        console.log(`📸 Saved screenshot: ${fileName}`);
      }
    } catch (err) {
      console.warn(`❌ Skipped screenshot: ${err.message}`);
    }
  },

  specFileRetries: 1,
};

// Merge with base config
exports.config = {
  ...baseConfig.config,
  ...ciConfig,
};
