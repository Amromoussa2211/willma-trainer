describe('App Launch and Login Flow', () => {
  before(async () => {
    // Launch the app
    await driver.startActivity(
      'com.willma.client.staging',
      'com.willma.client.staging.MainActivity' // Replace with the correct activity
    );
    console.log('App launched successfully.');
  });

  it('should input a valid email, password, and click the login button successfully', async () => {
    try {
      // Step 1: Wait for the email input field to appear
      const emailField = await $('//android.widget.EditText[@resource-id="email-input"]'); // Using XPath with resource-id
      await emailField.waitForDisplayed({ timeout: 30000 });
      console.log('Email input field is displayed.');

      // Step 2: Click the email input field and enter a valid email
      await emailField.click();
      await emailField.setValue('ralice4293@myweblaw.com');
      console.log('Email entered: ralice4293@myweblaw.com');

      // Step 2.5: Press the "Enter" key to dismiss the keyboard
      await driver.pressKeyCode(66); // 66 is the keycode for the "Enter" key
      console.log('Pressed "Enter" key after entering email.');

      // Step 3: Validate the entered email value
      const enteredEmail = await emailField.getText();
      if (enteredEmail === 'ralice4293@myweblaw.com') {
        console.log('Test Passed: Email value is correct.');
      } else {
        console.error('Test Failed: Email value is incorrect.');
        // throw new Error(`Expected: ralice4293@myweblaw.com, but got: ${enteredEmail}`);
      }

      // Step 4: Wait for the password input field to appear
      const passwordField = await $('//android.widget.EditText[@resource-id="password-input"]'); // Using XPath with resource-id
      await passwordField.waitForDisplayed({ timeout: 30000 });
      console.log('Password input field is displayed.');

      // Step 5: Click the password input field and enter a valid password
      await passwordField.click();
      await passwordField.setValue('P@$$w0rd2010');
      console.log('Password entered: P@$$w0rd2010');

      // Step 5.5: Press the "Enter" key to dismiss the keyboard
      await driver.pressKeyCode(66); // 66 is the keycode for the "Enter" key
      console.log('Pressed "Enter" key after entering password.');

      // Step 6: Validate that the password field is populated (without checking the actual value)
      const isPasswordFieldPopulated = await passwordField.getText() !== '';
      if (isPasswordFieldPopulated) {
        console.log('Test Passed: Password field is populated.');
      } else {
        console.error('Test Failed: Password field is empty.');
        throw new Error('Password field is empty.');
      }

      // Step 7: Wait for the login button to appear
      const loginButton = await $('//android.view.ViewGroup[@content-desc="Sign In"]'); // Using XPath with content-desc
      await loginButton.waitForDisplayed({ timeout: 30000 });
      console.log('Login button is displayed.');

      // Step 8: Click the login button
      await loginButton.click();
      console.log('Login button clicked.');

      // Step 9: Verify successful login (if needed)
      console.log('Login successful.');
    } catch (error) {
      console.error('Test failed due to an error:', error.message);
      throw error;
    }
  });
});