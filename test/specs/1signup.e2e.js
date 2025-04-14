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

    it('should sign up successfully with fake data', async () => {
        try {
            // Click the sign-up button
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
            const maleOption = await $('-android uiautomator:new UiSelector().description("Male")');
            await maleOption.waitForDisplayed({ timeout: 60000 });
            await maleOption.click();
            console.log('Selected "Male" option.');

            // Click on the final option
            const finalOption = await $('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[5]/android.view.ViewGroup');
            await finalOption.waitForDisplayed({ timeout: 60000 });
            await finalOption.click();
            console.log('Clicked on the final option.');

            // Click the sign-up button to complete the process
            const completeSignUpButton = await $('//android.view.ViewGroup[@content-desc="Sign Up"]');
            await completeSignUpButton.waitForDisplayed({ timeout: 60000 });
            await completeSignUpButton.click();
            console.log('Clicked on the complete sign-up button.');

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
            // Upload photo flow
            const uploadPhotoOption = await $('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(23)');
            await uploadPhotoOption.waitForDisplayed({ timeout: 60000 });
            await uploadPhotoOption.click();
            console.log('Clicked upload photo button');

            // Select a specific photo from the gallery
            const specificPhoto = await $('-android uiautomator:new UiSelector().description(",Item 5,Photo,,April 10, 2025, 10:46 PM")');
            await specificPhoto.waitForDisplayed({ timeout: 60000 });
            await specificPhoto.click();
            console.log('Selected the specific photo with description ",Item 5,Photo,,April 10, 2025, 10:46 PM".');
            
            // Handle name input
            const nameInput = await $('//*[@resource-id="name-input"]');
            await nameInput.waitForDisplayed({ timeout: 15000 });
            const fakeName = faker.name.firstName();
            const validName = fakeName.replace(/[^a-zA-Z]/g, '').substring(0, 7); // Ensure only characters and limit to 7
            await nameInput.setValue(validName);
            console.log('Name entered successfully:', validName);


            // Click the "Continue" button
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
            // Refresh the page
        // Click anywhere outside the bottom sheet to close it
        const outsideBottomSheet = await $('-android uiautomator:new UiSelector().className("android.view.View").instance(0)');
        await outsideBottomSheet.waitForDisplayed({ timeout: 60000 });
        await outsideBottomSheet.click();
        console.log('Clicked outside the bottom sheet to close it.');

            console.log('Bottom sheet closed.');

            // Refresh the page
            await driver.refresh();
            console.log('Page refreshed successfully.');
        

            // Click on "Bachelor's degree"
            const bachelorsDegreeOption = await $('-android uiautomator:new UiSelector().text("Bachelor\'s degree")');
            await bachelorsDegreeOption.waitForDisplayed({ timeout: 60000 });
            await bachelorsDegreeOption.click();
            console.log('Clicked on "Bachelor\'s degree".');

            // Click on "High School"
            const highSchoolOption = await $('-android uiautomator:new UiSelector().resourceId("High School")');
            await highSchoolOption.waitForDisplayed({ timeout: 60000 });
            await highSchoolOption.click();
            console.log('Clicked on "High School".');

            // Click on "Upload file, PDF, PNG, JPG (max size 5MBs)"
            const uploadFileButton = await $('-android uiautomator:new UiSelector().description("Upload file, PDF, PNG, JPG (max size 5MBs)").instance(0)');
            await uploadFileButton.waitForDisplayed({ timeout: 60000 });
            await uploadFileButton.click();
            console.log('Clicked on "Upload file, PDF, PNG, JPG (max size 5MBs)".');

            // Enter value in "Certificate Name"
            const certificateNameInput = await $('-android uiautomator:new UiSelector().text("Certificate Name")');
            await certificateNameInput.waitForDisplayed({ timeout: 60000 });
            await certificateNameInput.setValue('testt');
            console.log('Entered value "testt" in "Certificate Name".');

            // Enter value in "Issuing Authority"
            const issuingAuthorityInput = await $('-android uiautomator:new UiSelector().text("Issuing Authority")');
            await issuingAuthorityInput.waitForDisplayed({ timeout: 60000 });
            await issuingAuthorityInput.setValue('Test Authority');
            console.log('Entered value "Test Authority" in "Issuing Authority".');

            // Click on "Day" and select 1
            const dayDropdown = await $('-android uiautomator:new UiSelector().text("Day")');
            await dayDropdown.waitForDisplayed({ timeout: 60000 });
            await dayDropdown.click();
            console.log('Clicked on "Day".');
            const dayOption = await $('-android uiautomator:new UiSelector().text("1")');
            await dayOption.waitForDisplayed({ timeout: 60000 });
            await dayOption.click();
            console.log('Selected "1" for "Day".');

            // Click on "Month" and select 01
            const monthDropdown = await $('-android uiautomator:new UiSelector().text("Month")');
            await monthDropdown.waitForDisplayed({ timeout: 60000 });
            await monthDropdown.click();
            console.log('Clicked on "Month".');
            const monthOption = await $('-android uiautomator:new UiSelector().text("01")');
            await monthOption.waitForDisplayed({ timeout: 60000 });
            await monthOption.click();
            console.log('Selected "01" for "Month".');

            // Click on "Year" and select 1975
            const yearDropdown = await $('-android uiautomator:new UiSelector().text("Year")');
            await yearDropdown.waitForDisplayed({ timeout: 60000 });
            await yearDropdown.click();
            console.log('Clicked on "Year".');
            const yearOption = await $('-android uiautomator:new UiSelector().text("1975")');
            await yearOption.waitForDisplayed({ timeout: 60000 });
            await yearOption.click();
            console.log('Selected "1975" for "Year".');

            // Click on "Upload file, PDF, PNG, JPG (max size 5MBs)" again
            const uploadFileButtonAgain = await $('-android uiautomator:new UiSelector().description("Upload file, PDF, PNG, JPG (max size 5MBs)")');
            await uploadFileButtonAgain.waitForDisplayed({ timeout: 60000 });
            await uploadFileButtonAgain.click();
            console.log('Clicked on "Upload file, PDF, PNG, JPG (max size 5MBs)" again.');

            // Select the specific photo
            const specificPhotoo = await $('-android uiautomator:new UiSelector().className("android.widget.LinearLayout").instance(10)');
            await specificPhotoo.waitForDisplayed({ timeout: 60000 });
            await specificPhotoo.click();
            console.log('Selected the specific photo.');



        } catch (error) {
            console.error('Error during the sign-up process:', error);
            await driver.saveScreenshot('./error_screenshot_signup_process.png');
            throw error; // Rethrow the error to fail the test
        }
    });
});
