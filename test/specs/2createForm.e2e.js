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

    it('makeform', async () => {
        // Enter email
        const emailInput = await $('android=new UiSelector().resourceId("email-input")');
        await emailInput.setValue('femojo8968@deenur.com');

        // Enter password
        const passwordInput = await $('android=new UiSelector().resourceId("password-input")');
        await passwordInput.setValue('Willma123!');

        // Click on Sign In button
        const signInButton = await $('android=new UiSelector().resourceId("login-button")');
        await signInButton.click();

        const menuButton = await driver.$("accessibility id:Menu");
        await menuButton.click();
        const formCenterOption = await driver.$('-android uiautomator:new UiSelector().text("Form Center")');
        await formCenterOption.click();
        const newFormButton = await driver.$("accessibility id:New Form");
        await newFormButton.click();

        // Enter form name
        const formNameInput = await $('-android uiautomator:new UiSelector().text("Form Name....")');
        await formNameInput.setValue('packegeAmrForm AUto');

        // Enter form description
        const formDescriptionInput = await $('-android uiautomator:new UiSelector().text("Enter Form Description")');
        await formDescriptionInput.setValue('this is mydescription ofPAck');

        // Click on "Add A Question"
        const addQuestionButton = await $('-android uiautomator:new UiSelector().text("Add A Question")');
        await addQuestionButton.click();

        // Wait until the "Enter question text" field is displayed
        const questionTextInput = await driver.$('//android.widget.EditText[@text="Enter question text"]');
        await questionTextInput.waitForDisplayed({ timeout: 5000 });

        // Enter the question text
        await questionTextInput.setValue('Automated Question');

        // Scroll down and click on "Text Question"
        const chooseTypeElement = await $('-android uiautomator:new UiSelector().description("Choose type")');
        await chooseTypeElement.scrollIntoView();
        await chooseTypeElement.click();
        // await textQuestionElement.waitForDisplayed({ timeout: 5000 });
        // await textQuestionElement.click();

        // Wait and select the specific element
        const specificElement = await $('-android uiautomator:new UiSelector().className("android.view.ViewGroup").index(0)');
        await specificElement.waitForDisplayed({ timeout: 5000 });
        await specificElement.click();

        // Click on the "Question?" element
        const questionElement = await $('-android uiautomator:new UiSelector().text("Question?")');
        await questionElement.waitForDisplayed({ timeout: 5000 });
        await questionElement.click();

        // Click on "Select" using accessibility id
        const selectElement = await $('-android uiautomator:new UiSelector().description("Select")');
        await selectElement.waitForDisplayed({ timeout: 5000 });
        await selectElement.click();

        // Click on "Save Form" using accessibility id
        const saveFormButton = await $('-android uiautomator:new UiSelector().description("Save Form")');
        await saveFormButton.waitForDisplayed({ timeout: 5000 });
        await saveFormButton.click();

        console.log('Form creation flow completed successfully.');
        // Click on the SvgView element
        const svgViewElement = await $('-android uiautomator:new UiSelector().className("com.horcrux.svg.SvgView").instance(0)');
        await svgViewElement.waitForDisplayed({ timeout: 5000 });
        await svgViewElement.click();

        // Click on "Logout" using accessibility id
        const logoutElement = await $('-android uiautomator:new UiSelector().description("Logout")');
        await logoutElement.waitForDisplayed({ timeout: 5000 });
        await logoutElement.click();

        // Click on "Yes" using accessibility id
        const yesElement = await $('-android uiautomator:new UiSelector().description("Yes")');
        await yesElement.waitForDisplayed({ timeout: 5000 });
        await yesElement.click();

        console.log('Logout flow completed successfully.');


    });
});