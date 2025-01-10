describe('Click on Consultants', () => {
    it('should launch the app and click on the Consultants button', async () => {
      try {
        // Step 1: Verify the app is installed
        const isAppInstalled = await browser.isAppInstalled('com.willma.client.staging');
        expect(isAppInstalled).toBe(true);
        console.log('App is installed.');
  
        // Step 2: Launch the app
        await browser.startActivity('com.willma.client.staging', 'com.willma.client.staging.MainActivity');
        console.log('App launched successfully.');
  
        // Step 3: Wait for the Consultants button to be visible
        const consultantsButton = await $('~Consultants'); // Use accessibility ID
        await consultantsButton.waitForDisplayed({ timeout: 60000 }); // Increased timeout
        console.log('Consultants button is displayed.');
  
        // Step 4: Click on the Consultants button
        await consultantsButton.click();
        console.log('Clicked on the Consultants button successfully!');
  
        // Step 5: Verify navigation to the Consultants screen
        const consultantsScreenElement = await $('~consultants-screen'); // Use accessibility ID
        await consultantsScreenElement.waitForDisplayed({ timeout: 60000 }); // Increased timeout
        expect(await consultantsScreenElement.isDisplayed()).toBe(true);
        console.log('Successfully navigated to the Consultants screen.');
      } catch (error) {
        console.error('Test failed due to an error:', error.message);
        const screenshot = await driver.takeScreenshot();
        console.log('Screenshot taken:', screenshot);
        throw error;
      }
    });
  });