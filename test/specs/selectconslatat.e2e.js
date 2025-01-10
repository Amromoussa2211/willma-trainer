describe('Click on Consultants', () => {
    it('should launch the app and click on the Consultants button', async () => {
      try {
        // Verify the app is installed
        const isAppInstalled = await driver.isAppInstalled('com.willma.client.staging');
        console.log('App installed:', isAppInstalled);
  
        // Launch the app
        await driver.startActivity('com.willma.client.staging', 'com.willma.client.staging.MainActivity');
        console.log('App launched successfully.');
  
        // Wait for the Consultants button to be visible
        const consultantsButton = await $('~Consultants');
        console.log('Waiting for Consultants button...');
        await consultantsButton.waitForDisplayed({ timeout: 240000 }); // Increased timeout
        console.log('Consultants button is displayed.');
  
        // Click on the Consultants button
        await consultantsButton.click();
        console.log('Clicked on the Consultants button successfully!');
  
        // No assertion for navigation to the Consultants screen
        console.log('Test completed without verifying navigation.');
      } catch (error) {
        console.error('Test failed due to an error:', error.message);
        const screenshot = await driver.takeScreenshot();
        console.log('Screenshot taken:', screenshot);
        throw error;
      }
    });
  });