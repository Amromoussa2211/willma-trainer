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

// CI-specific overrides and hooks for a single session handling two apps
const ciConfig = {
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '14',
    'appium:autoGrantPermissions': true,
    'appium:noReset': true,
    'appium:autoLaunch': false, // tests will launch via startActivity/activateApp
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
    // Install both apps
    try {
      console.log('📥 Installing both APKs...');
      await driver.installApp(process.env.apk_CI_PATH);
      await driver.installApp(process.env.appclient_path);
    } catch (e) {
      console.warn('⚠️ App install failed:', e.message);
    }
    
    // Clear app data for a fresh start
    try {
      execSync('adb -s emulator-5554 shell pm clear com.willma.staging');
      execSync('adb -s emulator-5554 shell pm clear com.client.app');
    } catch {}
    
    // Dismiss any System UI crash dialog
    await handleSystemUIDialog();
    
    // Launch WILLMA Trainer
    try {
      console.log('🚀 Launching WILLMA Trainer');
      await driver.activateApp('com.willma.staging');
      console.log('✅ WILLMA Trainer launched');
    } catch (e) {
      console.error('❌ Failed to launch WILLMA Trainer:', e.message);
    }
    
    // Switch to Client App
    try {
      console.log('🚀 Activating Client App');
      await driver.activateApp('com.client.app');
      console.log('✅ Client App activated');
    } catch (e) {
      console.error('❌ Failed to activate Client App:', e.message);
    }
  },
  
  afterTest: async function (test, context, { error }) {
    try {
      if (browser && browser.sessionId) {
        await browser.saveScreenshot(`./diagnostics/${test.title.replace(/\s+/g, '_')}.png`);
      }
    } catch (err) {
      console.warn(`❌ Skipped screenshot: ${err.message}`);
    }
  },
  
  specFileRetries: 1,
};

// Merge with base WDIO config
exports.config = { ...baseConfig.config, ...ciConfig };
