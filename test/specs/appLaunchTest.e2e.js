const path = require('path');
const fs = require('fs');

describe('App Launch Test', () => {
    it('should verify that the app is installed and launched successfully', async () => {
        // Verify that the app is installed
        const isInstalled = await driver.isAppInstalled('com.willma.client.staging');
        console.log(`App installed: ${isInstalled}`);
        expect(isInstalled).toBe(true);

        // Launch the app using the correct method for Android
        await driver.execute('mobile: activateApp', { appId: 'com.willma.client.staging' });
        console.log('App launched');

        // Wait for the app to load and verify the main screen
        const mainScreenElement = await $('//android.widget.LinearLayout[@resource-id="com.willma.client.staging:id/action_bar_root"]');
        await mainScreenElement.waitForDisplayed({ timeout: 60000 });
        console.log('Main screen element is displayed');

        // Optional: Take a screenshot for debugging
        const screenshotDir = path.join(__dirname, '../screenshots');
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }
        const fileName = path.join(screenshotDir, 'app_launch_test.png');
        await driver.saveScreenshot(fileName);
        console.log(`Screenshot saved: ${fileName}`);
    });
});