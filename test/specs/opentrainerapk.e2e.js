describe('App Launch Test', () => {
    before(async () => {
      // Launch the app
      await driver.startActivity(
        'com.willma.staging', // Updated package name
        'com.willma.staging.MainActivity' // Updated main activity
      );
      console.log('App launched successfully.');
    });
  
    it('should verify the app is launched successfully', async () => {
      try {
        // Wait for the main screen to load
        const mainScreenElement = await $('//android.widget.LinearLayout[@resource-id="com.willma.staging:id/action_bar_root"]');
        await mainScreenElement.waitForDisplayed({ timeout: 60000 });
        console.log('Main screen is displayed.');
  
        // Take a screenshot
        await driver.saveScreenshot('./screenshots/main-screen.png');
        console.log('Screenshot saved.');
      } catch (error) {
        console.error('Test failed:', error.message);
        await driver.saveScreenshot('./screenshots/error.png');
        throw error;
      }
    });
  });