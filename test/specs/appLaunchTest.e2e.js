describe('App Launch Test', () => {
    it('should verify that the app is installed and launched successfully', async () => {
        // Verify that the app is installed
        const isInstalled = await driver.isAppInstalled('com.willma.client.staging');
        console.log(`App installed: ${isInstalled}`);
        expect(isInstalled).toBe(true);

        // Launch the app
        await driver.launchApp();
        console.log('App launched');

        // Wait for the app to load and verify the main screen
        const mainScreenElement = await $('~MainScreenElement'); // Replace with a valid element locator
        await mainScreenElement.waitForDisplayed({ timeout: 60000 });
        console.log('Main screen element is displayed');

        // // Optional: Take a screenshot for debugging
        // const screenshotDir = path.join(__dirname, '../screenshots');
        // if (!fs.existsSync(screenshotDir)) {
        //     fs.mkdirSync(screenshotDir, { recursive: true });
        // }
        // const fileName = path.join(screenshotDir, 'app_launch_test.png');
        // await driver.saveScreenshot(fileName);
        // console.log(`Screenshot saved: ${fileName}`);
    });
});