describe('Sign Out and Sign In Flow', () => {
    it('should sign out successfully', async () => {
      try {
        // Step 1: Open the menu
        const menuButton = await $('//android.view.ViewGroup[@content-desc="Menu"]'); // Use XPath
        await menuButton.waitForExist({ timeout: 60000 });
        console.log('Menu button exists:', await menuButton.isExisting());
  
        await menuButton.waitForDisplayed({ timeout: 60000 });
        console.log('Menu button is displayed:', await menuButton.isDisplayed());
  
        await menuButton.click();
        console.log('Menu button clicked.');
  
        // Step 2: Wait for the logout button to appear
        const logoutButton = await $('~Logout'); // Using accessibility ID
        await logoutButton.waitForDisplayed({ timeout: 60000 });
        console.log('Logout button is displayed:', await logoutButton.isDisplayed());
  
        // Step 3: Click the logout button
        await logoutButton.click();
        console.log('Logout button clicked successfully.');
  
        // Step 4: Wait for the login screen to appear
        const loginScreen = await $('~login-screen');
        await loginScreen.waitForDisplayed({ timeout: 120000 });
        console.log('Login screen is displayed after logout.');
      } catch (error) {
        console.error('Test failed due to an error:', error.message);
        throw error;
      }
    });
  
  
  //  Scenario 2: Handle Login with Failed Email
  it('should handle login with invalid credentials', async () => {
    try {
      // Step 1: Wait for the login screen to appear
      const loginScreen = await $('~login-screen');
      await loginScreen.waitForDisplayed({ timeout: 60000 });
      console.log('Login screen is displayed.');
  
      // Step 2: Enter email
      const emailField = await $('//android.widget.EditText[@resource-id="email-input"]');
      await emailField.waitForDisplayed({ timeout: 30000 });
      await emailField.click();
      await emailField.setValue('test@test.com');
      console.log('Email entered: test@test.com');
  
      // Step 3: Enter password
      const passwordField = await $('//android.widget.EditText[@resource-id="password-input"]');
      await passwordField.waitForDisplayed({ timeout: 30000 });
      await passwordField.click();
      await passwordField.setValue('invalidpassword');
      console.log('Password entered: invalidpassword');
  
      // Step 4: Click the Sign In button
      const signInButton = await $('~Sign In'); // Using accessibility ID
      await signInButton.waitForDisplayed({ timeout: 30000 });
      await signInButton.click();
      console.log('Sign In button clicked.');
  
      // Step 5: Handle failed login scenario
      const errorMessage = await $('~login-error-message'); // Replace with actual error message locator
      await errorMessage.waitForDisplayed({ timeout: 30000 });
      console.log('Login failed with error:', await errorMessage.getText());
    } catch (error) {
      console.error('Test failed due to an error:', error.message);
      throw error;
    }
  });
});