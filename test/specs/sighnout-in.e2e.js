describe('Sign Out and Sign In Flow', () => {
  it('should sign out successfully', async () => {
      try {
          // Step 1: Open the menu
          const menuButton = await $('~Menu'); // Use accessibility ID instead of XPath
          await menuButton.waitForExist({ timeout: 60000 });
          console.log('Menu button exists:', await menuButton.isExisting());

          await menuButton.waitForDisplayed({ timeout: 60000 });
          console.log('Menu button is displayed:', await menuButton.isDisplayed());

          await menuButton.waitForClickable({ timeout: 60000 }); // Ensure the button is clickable
          console.log('Menu button is clickable.');

          await menuButton.click();
          console.log('Menu button clicked.');

          // Step 2: Wait for the logout button to appear
          const logoutButton = await $('~Logout'); // Using accessibility ID
          await logoutButton.waitForExist({ timeout: 60000 });
          console.log('Logout button exists:', await logoutButton.isExisting());

          await logoutButton.waitForDisplayed({ timeout: 60000 });
          console.log('Logout button is displayed:', await logoutButton.isDisplayed());

          await logoutButton.waitForClickable({ timeout: 60000 }); // Ensure the button is clickable
          console.log('Logout button is clickable.');

          // Step 3: Click the logout button
          await logoutButton.click();
          console.log('Logout button clicked successfully.');

          // Step 4: Wait for the login screen to appear
          const loginScreen = await $('~login-screen');
          await loginScreen.waitForExist({ timeout: 120000 });
          console.log('Login screen exists after logout.');

          await loginScreen.waitForDisplayed({ timeout: 120000 });
          console.log('Login screen is displayed after logout.');
      } catch (error) {
          console.error('Test failed due to an error:', error.message);
          throw error; // Rethrow the error to fail the test
      }
  });
});