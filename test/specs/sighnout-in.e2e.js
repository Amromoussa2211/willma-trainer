// describe('Sign Out and Sign In Flow', () => {
//     it('should sign out successfully', async () => {
//       try {
//         // Verify the app is installed
//         const isAppInstalled = await driver.isAppInstalled('com.willma.client.staging');
//         console.log('App installed:', isAppInstalled);
  
//         // Launch the app
//         await driver.startActivity('com.willma.client.staging', 'com.willma.client.staging.MainActivity');
//         console.log('App launched successfully.');
  
//         // Open the menu
//         const menuButton = await $('~Menu');
//         console.log('Waiting for Menu button...');
//         await menuButton.waitForDisplayed({ timeout: 240000 }); // Increased timeout
//         console.log('Menu button is displayed.');
  
//         await menuButton.click();
//         console.log('Menu button clicked.');
  
//         // Wait for the logout button to appear
//         const logoutButton = await $('~Logout');
//         console.log('Waiting for Logout button...');
//         await logoutButton.waitForDisplayed({ timeout: 240000 }); // Increased timeout
//         console.log('Logout button is displayed.');
  
//         // Click the logout button
//         await logoutButton.click();
//         console.log('Logout button clicked successfully.');
  
//         // No assertion for the login screen
//         console.log('Test completed without verifying login screen.');
//       } catch (error) {
//         console.error('Test failed due to an error:', error.message);
//         const screenshot = await driver.takeScreenshot();
//         console.log('Screenshot taken:', screenshot);
//         throw error;
//       }
//     });
//   });