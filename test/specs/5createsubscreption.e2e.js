import { expect } from 'chai';
import { remote } from 'webdriverio';
describe('App Launch and Login Flow', () => {
    before(async () => {
      // Launch the app
      await driver.startActivity(
        'com.willma.client.staging',
        'com.willma.client.staging.MainActivity'
      );
      console.log('App launched successfully.');
  
      // Log the current activity to confirm the app is on the correct screen
      console.log('Current activity:', await driver.getCurrentActivity());
    });
  
    it('should input a valid email, password, and click the login button successfully', async () => {
      try {
        // Step 1: Wait for the email input field to appear
        const emailField = await $('//android.widget.EditText[@resource-id="email-input"]');
        await emailField.waitForDisplayed({ timeout: 60000 }); // Increased timeout
        console.log('Email input field is displayed.');
  
        // Step 2: Click the email input field and enter a valid email
        await emailField.click();
        await emailField.setValue('panib43182@noroasis.com');
        console.log('Email entered: panib43182@noroasis.com');
  
        // Step 2.5: Press the "Enter" key to dismiss the keyboard
        await driver.pressKeyCode(66); // 66 is the keycode for the "Enter" key
        console.log('Pressed "Enter" key after entering email.');
  
        // Step 3: Validate the entered email value
        const enteredEmail = await emailField.getText();
        if (enteredEmail === 'panib43182@noroasis.com') {
          console.log('Test Passed: Email value is correct.');
        } else {
          console.error('Test Failed: Email value is incorrect.');
          throw new Error(`Expected: panib43182@noroasis.com, but got: ${enteredEmail}`);
        }
  
        // Step 4: Wait for the password input field to appear
        const passwordField = await $('//android.widget.EditText[@resource-id="password-input"]');
        await passwordField.waitForDisplayed({ timeout: 60000 }); // Increased timeout
        console.log('Password input field is displayed.');
  
        // Step 5: Click the password input field and enter a valid password
        await passwordField.click();
        await passwordField.setValue('Abc@1234');
        console.log('Password entered: Abc@1234');
  
        // Step 5.5: Press the "Enter" key to dismiss the keyboard
        await driver.pressKeyCode(66); // 66 is the keycode for the "Enter" key
        console.log('Pressed "Enter" key after entering password.');
  
        // Step 6: Validate that the password field is populated
        const isPasswordFieldPopulated = await passwordField.getText() !== '';
        if (isPasswordFieldPopulated) {
          console.log('Test Passed: Password field is populated.');
        } else {
          console.error('Test Failed: Password field is empty.');
          throw new Error('Password field is empty.');
        }
  
        // Step 7: Wait for the login button to appear
        const loginButton = await $('//android.view.ViewGroup[@content-desc="Sign In"]');
        await loginButton.waitForDisplayed({ timeout: 60000 }); // Increased timeout
        console.log('Login button is displayed.');
  
        // Step 8: Click the login button
        await loginButton.click();
        console.log('Login button clicked.');
  
        // Step 9: Verify successful login
        console.log('Login successful.');

         driver.refresh(); // Refresh the driver to ensure the app is in the correct state
        // Wait for the Consultants element to appear
        const consultantsElement = await driver.$('//android.widget.TextView[@text="Consultants"]');
        await consultantsElement.waitForDisplayed({ timeout: 60000 });
        console.log('Consultants element is displayed.');

        // Click on the Consultants element
        await consultantsElement.click();
        console.log('Consultants element clicked.');

        driver.refresh(); // Refresh the driver to ensure the app is in the correct state

        // Perform the first pointer action
        await driver.action('pointer')
            .move({ duration: 0, x: 679, y: 440 })
            .down({ button: 0 })
            .move({ duration: 1000, x: 58, y: 446 })
            .up({ button: 0 })
            .perform();
        console.log('First pointer action performed.');

        // Perform the second pointer action
        await driver.action('pointer')
            .move({ duration: 0, x: 324, y: 440 })
            .down({ button: 0 })
            .pause(50)
            .up({ button: 0 })
            .perform();
        console.log('Second pointer action performed.');

        // Perform a scroll action to bring the "Yoga" element into view
        await driver.execute('mobile: scroll', { strategy: 'accessibility id', selector: 'Yoga' });
        console.log('Scrolled to bring "Yoga" element into view.');

        // Wait for the "Yoga" element to appear
        const yogaElement = await driver.$('//android.widget.TextView[@text="Yoga"]');
        await yogaElement.waitForDisplayed({ timeout: 60000 });
        console.log('"Yoga" element is displayed.');

        // Click on the "Yoga" element
        await yogaElement.click();
        console.log('"Yoga" element clicked.');

        // Scroll into the ScrollView using Android UIAutomator
        const scrollView = await driver.$('android=new UiSelector().className("android.widget.ScrollView")');
        await scrollView.scrollIntoView();
        console.log('Scrolled into the ScrollView.');

        // Scroll until the "Willma Tester" element is found using Android UIAutomator
        const willmaTesterElement = await driver.$('android=new UiSelector().text("Willma Tester")');
        await willmaTesterElement.waitForDisplayed({ timeout: 60000 });
        console.log('"Willma Tester" element is displayed.');

        // Click on the "Willma Tester" element
        await willmaTesterElement.click();
        console.log('"Willma Tester" element clicked.');
        driver.refresh(); // Refresh the driver to ensure the app is in the correct state
        // Click on the "Packages" element using accessibility ID
        const packagesElement = await driver.$('~Packages');
        await packagesElement.waitForDisplayed({ timeout: 60000 });
        console.log('"Packages" element is displayed.');

        // Click on the "Packages" element
        await packagesElement.click();
        console.log('"Packages" element clicked.');

    driver.refresh(); // Refresh the driver to ensure the app is in the correct state
    // Locate the ScrollView element using Android UIAutomator
    // const scrollVieww = await driver.$('android=new UiSelector().className("android.widget.ScrollView")');
    // await driver.execute('mobile: scroll', { element: scrollVieww.elementId, direction: 'down', maxSwipes: 5 });

    await driver.action('pointer')
        .move({ duration: 0, x: 40, y: 876 })
        .down({ button: 0 })
        .move({ duration: 1000, x: 46, y: 147 })
        .up({ button: 0 })
        .perform();

    await driver.action('pointer')
        .move({ duration: 0, x: 27, y: 1050 })
        .down({ button: 0 })
        .move({ duration: 1000, x: 34, y: 217 })
        .up({ button: 0 })
        .perform();

    await driver.action('pointer')
        .move({ duration: 0, x: 15, y: 1209 })
        .down({ button: 0 })
        .move({ duration: 1000, x: 21, y: 296 })
        .up({ button: 0 })
        .perform();
        const automatedPackageElement = await driver.$('//android.widget.TextView[@text="automated Package"]');

    await automatedPackageElement.waitForDisplayed({ timeout: 60000 });

    // Scroll down within the ScrollView until the "automated Package" element is found
    console.log('Scrolled down within the ScrollView.');
    await automatedPackageElement .waitForDisplayed({ timeout: 60000 });
    await automatedPackageElement.click();
    console.log('"automated Package" element clicked.');

    // Wait for the "Subscribe Now" element to appear using accessibility ID
    const subscribeNowElement = await driver.$('~Subscribe Now');
    await subscribeNowElement.waitForDisplayed({ timeout: 60000 });
    console.log('"Subscribe Now" element is displayed.');

    // Click on the "Subscribe Now" element
    await subscribeNowElement.click();
    console.log('"Subscribe Now" element clicked.');

driver.refresh(); // Refresh the driver to ensure the app is in the correct state
// Wait for the element with text "1000.00 E£" to appear using XPath
const priceElement = await driver.$('//android.widget.TextView[@text="1000.00 E£"]');
await priceElement.waitForDisplayed({ timeout: 60000 });
console.log('"1000.00 E£" element is displayed.');

// Assert that the element contains the correct text
const priceText = await priceElement.getText();
if (priceText === "1000.00 E£") {
    console.log('Test Passed: The price element contains the correct text.');
} else {
    console.error('Test Failed: The price element does not contain the correct text.');
    throw new Error(`Expected: "1000.00 E£", but got: "${priceText}"`);
}
// Assert that the price element is displayed with the correct text using Chai
expect(await priceElement.isDisplayed()).to.be.true;
expect(priceText).to.equal("1000.00 E£");
console.log('Assertion Passed: The price element is displayed with the correct text.');
// Navigate back to the previous screen
await driver.back();
console.log('Navigated back to the previous screen.');
await driver.back();
await driver.back();
await driver.back();
// Wait for the "Menu" element to appear using XPath
const menuElement = await driver.$('//android.view.View[@content-desc="Menu"]');
await menuElement.waitForDisplayed({ timeout: 60000 });
console.log('"Menu" element is displayed.');

// Click on the "Menu" element
await menuElement.click();
console.log('"Menu" element clicked.');
// Wait for the "Logout" element to appear using XPath
const logoutElement = await driver.$('//android.view.ViewGroup[@content-desc="Logout"]');
await logoutElement.waitForDisplayed({ timeout: 60000 });
console.log('"Logout" element is displayed.');
// Wait for the "Yes" element to appear using accessibility ID
const yesElement = await driver.$('~Yes');
await yesElement.waitForDisplayed({ timeout: 60000 });
console.log('"Yes" element is displayed.');

// Click on the "Yes" element
await yesElement.click();
console.log('"Yes" element clicked.');

// Click on the "Logout" element
await logoutElement.click();
console.log('"Logout" element clicked.');
      } catch (error) {
        console.error('Test failed due to an error:', error.message);
        const screenshot = await driver.takeScreenshot();
        console.log('Screenshot taken:', screenshot);
        throw error;
      }
    });
  });