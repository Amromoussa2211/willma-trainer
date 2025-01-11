describe('App Launch Test', () => {
  it('should verify that the app is installed and launched successfully', async () => {
    try {
      // Step 1: Verify the app is installed
      const isAppInstalled = await driver.isAppInstalled('com.willma.client.staging');
      expect(isAppInstalled).toBe(true);
      console.log('App is installed.');

      // Step 2: Launch the app
      await driver.startActivity('com.willma.client.staging', 'com.willma.client.staging.MainActivity');
      console.log('App launched successfully.');

      // Step 3: Verify the app is launched by checking for a specific element on the home screen
      const homeElement = await $('~Home'); // Use accessibility ID
      await homeElement.waitForDisplayed({ timeout: 60000 }); // Increased timeout
      expect(await homeElement.isDisplayed()).toBe(true);
      console.log('Home screen element is displayed.');
    } catch (error) {
      console.error('Test failed due to an error:', error.message);
      const screenshot = await driver.takeScreenshot();
      console.log('Screenshot taken:', screenshot);
      throw error;
    }
  });
});