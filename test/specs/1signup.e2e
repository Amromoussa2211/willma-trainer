import { expect } from 'chai';
import { faker } from '@faker-js/faker';

async function restartUiAutomator2Server() {
    console.log('Restarting UiAutomator2 server...');
    await driver.deleteSession(); // End the current session
    await driver.startSession(); // Start a new session
    console.log('UiAutomator2 server restarted.');
}

describe('Signup Flow', () => {
    before(async () => {
        try {
            // Launch the app
            await driver.startActivity(
                'com.willma.staging',
                'com.willma.staging.MainActivity'
            );
            console.log('App launched successfully.');
        } catch (error) {
            console.error('Error launching the app:', error);
            await restartUiAutomator2Server(); // Restart UiAutomator2 if needed
        }
    });

    it('should sign up successfully with fake data and select any photo', async () => {
        try {
            // Check if the button with id "android:id/button1" is displayed and click on it
            const button1 = await $('-android uiautomator:new UiSelector().resourceId("android:id/button1")');
            if (await button1.isDisplayed()) {
                await button1.click();
                console.log('Clicked on the button with id "android:id/button1".');
            }
            const signUpButton = await $('-android uiautomator:new UiSelector().resourceId("signup-button")');
            await signUpButton.waitForDisplayed({ timeout: 60000 });
            await signUpButton.click();
            console.log('Sign Up button clicked.');

            // Wait for the username input to appear
            const usernameInput = await $('-android uiautomator:new UiSelector().resourceId("username-input")');
            await usernameInput.waitForDisplayed({ timeout: 60000 });
            await usernameInput.setValue(faker.internet.userName());
            console.log('Entered fake username.');

            // Enter fake email
            const emailInput = await $('-android uiautomator:new UiSelector().resourceId("email-input")');
            await emailInput.waitForDisplayed({ timeout: 60000 });
            await emailInput.setValue(faker.internet.email());
            console.log('Entered fake email.');

            // Enter password
            const passwordInput = await $('-android uiautomator:new UiSelector().resourceId("password-input")');
            await passwordInput.waitForDisplayed({ timeout: 60000 });
            await passwordInput.setValue('Abc@1234');
            console.log('Entered password.');

            // Confirm password
            const confirmPasswordInput = await $('-android uiautomator:new UiSelector().resourceId("confirm-password-input")');
            await confirmPasswordInput.waitForDisplayed({ timeout: 60000 });
            await confirmPasswordInput.setValue('Abc@1234');
            console.log('Confirmed password.');

            // Scroll down to the phone input
            await driver.execute('mobile: scroll', { strategy: 'accessibility id', selector: 'phone-input' });
            console.log('Scrolled to phone input.');

            // Enter fake phone number
            const phoneInput = await $('-android uiautomator:new UiSelector().resourceId("phone-input")');
            await phoneInput.waitForDisplayed({ timeout: 60000 });
            await phoneInput.setValue(faker.phone.number('##########')); // 10-digit phone number
            console.log('Entered fake phone number.');

            // Select the "Male" option
            try {
                const finalOption = await driver.$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[8]');
                await finalOption.waitForDisplayed({ timeout: 60000 });
                await finalOption.click();
                console.log('Clicked on the final option.');
            } catch (error) {
                console.error('Error clicking on the final option:', error);
                throw new Error('Failed to click on the final option.');
            }

            const maleOption = await $('-android uiautomator:new UiSelector().description("Male")');
            await maleOption.waitForDisplayed({ timeout: 60000 });
            await maleOption.click();
            console.log('Selected "Male" option.');

            // Click on the final option
            // Refresh the driver to ensure the element appears before clicking on it
            

            // Click the sign-up button to complete the process
            const completeSignUpButton = await $('~Sign Up');
            await completeSignUpButton.waitForDisplayed({ timeout: 60000 });
            await completeSignUpButton.click();
            console.log('Clicked on the complete sign-up button.');

            driver.refresh(); // Refresh the driver to ensure the element appears before clicking on it
            // Wait for the OTP input to appear
            const otpInput = await $('-android uiautomator:new UiSelector().resourceId("otp-input-hidden")');
            await otpInput.waitForDisplayed({ timeout: 60000 });
            await otpInput.setValue('111111');
            console.log('Entered OTP.');

            // Click the "Verify Code" button
            const verifyCodeButton = await $('~Verify Code');
            await verifyCodeButton.waitForDisplayed({ timeout: 60000 });
            await verifyCodeButton.click();
            console.log('Clicked on the "Verify Code" button.');

            // Wait for the login button to appear
            const loginButton = await $('-android uiautomator:new UiSelector().resourceId("login-button")');
            await loginButton.waitForDisplayed({ timeout: 60000 });
            console.log('Login button is displayed.');

          // Click on the option to upload a photo
// Click on the option to upload a photo
const uploadPhotoOption = await $('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(23)');
await uploadPhotoOption.waitForDisplayed({ timeout: 60000 });
await uploadPhotoOption.click();
console.log('Clicked upload photo button');

// Wait for the gallery to open and find the timeline view
const timelineView = await $('//*[@resource-id="com.coloros.gallery3d:id/timeline_view"]');
await timelineView.waitForDisplayed({ timeout: 60000 });
console.log('Found the timeline view.');

// Find all child elements within the timeline view that might contain photos
const childrenOfTimeline = await timelineView.$$('*'); // $$ finds multiple elements
console.log(`Found ${childrenOfTimeline.length} children in the timeline view.`);

let photoWasClicked = false;

// Iterate through the children and look for elements with "Photo" in their content-desc
for (const child of childrenOfTimeline) {
    try {
        const contentDescription = await child.getAttribute('content-desc');
        if (contentDescription && contentDescription.includes('Photo')) {
            console.log(`Found an element with content-desc: "${contentDescription}". Clicking it.`);
            await child.click();
            photoWasClicked = true;
            break; // Click the first photo found and exit the loop
        }
    } catch (error) {
        // Ignore errors if an element doesn't have a content-desc attribute
        // or if there's an issue getting it.
    }
}

if (photoWasClicked) {
    console.log('Successfully clicked on a photo.');
} else {
    console.log('Could not find and click on any photo within the timeline view.');
    // You might want to add error handling here if no photo is found
}
            // Handle name input
            const nameInput = await $('//*[@resource-id="name-input"]');
            await nameInput.waitForDisplayed({ timeout: 15000 });
            const fakeName = 'Automated'; // Set the name to "FirstAutomated"
            const randomAlphabet = faker.random.alpha({ count: 1, casing: 'upper' }); // Generate a random uppercase alphabetic character
            await nameInput.setValue(`${fakeName}${randomAlphabet}`);
            console.log('Name entered successfully:', fakeName);

            // Click the "Next" button
            const nextButton = await $('//android.view.ViewGroup[@content-desc="Next"]');
            await nextButton.waitForDisplayed({ timeout: 60000 });
            await nextButton.click();
            console.log('Clicked on the "Next" button.');

            // Wait for the new page to open and enter value 12 in "number-input"
            const numberInput = await $('-android uiautomator:new UiSelector().resourceId("number-input")');
            await numberInput.waitForDisplayed({ timeout: 60000 });
            await numberInput.setValue('12');
            console.log('Entered value 12 in "number-input".');

            // Enter bio in "password-input"
            const bioInput = await $('-android uiautomator:new UiSelector().resourceId("password-input")');
            await bioInput.waitForDisplayed({ timeout: 60000 });
            await bioInput.setValue('I am trainer and this is my bio it automated');
            console.log('Entered bio in "password-input".');

            // Click on "+ Add" button
            const addButton = await $('-android uiautomator:new UiSelector().text("+ Add")');
            await addButton.waitForDisplayed({ timeout: 60000 });
            await addButton.click();
            console.log('Clicked on "+ Add" button.');

            // Click on the specific item in the bottom sheet
            const nutritionistOption = await $('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(42)');
            await nutritionistOption.waitForDisplayed({ timeout: 60000 });
            await nutritionistOption.click();
            console.log('Clicked on the "Nutritionist" option.');
            // Click anywhere outside the bottom sheet to close it
            driver.refresh() // This should close the bottom sheet
            console.log('Clicked back to close the bottom sheet.');
            const outsideBottomSheet = await $('//android.widget.TextView[@resource-id="password-input-label"]');
            await outsideBottomSheet.waitForDisplayed({ timeout: 60000 });
            await outsideBottomSheet.click();
            console.log('Clicked outside the bottom sheet to close it.');
            console.log('Bottom sheet closed.');
            // Click on the "Finish Setup" button using accessibility id
            const finishSetupButton = await $('~Finish Setup');
            await finishSetupButton.waitForDisplayed({ timeout: 60000 });
            await finishSetupButton.click();
            console.log('Clicked on the "Finish Setup" button.');



        } catch (error) {
            console.error('Error during the sign-up process:', error);
            await driver.saveScreenshot('./error_screenshot_signup_process.png');
            throw error; // Rethrow the error to fail the test
        }
    });
});