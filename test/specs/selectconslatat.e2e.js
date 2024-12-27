describe('Click on Consultants', () => {
    it('should launch the app and click on the Consultants button', async () => {
        // Debug: Check if the browser object is available
        console.log(browser);

        // Step 1: Verify the app is installed
        const isAppInstalled = await browser.isAppInstalled('com.willma.client.staging');
        expect(isAppInstalled).toBe(true);
        console.log('App is installed.');

        // Step 2: Launch the app
        await browser.startActivity('com.willma.client.staging', 'com.willma.client.staging.MainActivity');
        console.log('App launched successfully.');

        // Step 3: Wait for the Consultants button to be visible
        const consultantsButton = await $('~Consultants'); // Using accessibility ID
        await consultantsButton.waitForDisplayed({ timeout: 30000 }); // Increased timeout

        // Step 4: Click on the Consultants button
        await consultantsButton.click();
        console.log('Clicked on the Consultants button successfully!');

        // Step 5: Add an assertion or further actions if needed
        const consultantsScreenElement = await $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup');
        await consultantsScreenElement.waitForDisplayed({ timeout: 30000 }); // Increased timeout
        expect(await consultantsScreenElement.isDisplayed()).toBe(true);
        console.log('Successfully navigated to the Consultants screen.');
    });
});