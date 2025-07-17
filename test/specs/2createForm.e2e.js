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
        await emailInput.setValue('amr@test.test');

        // Enter password
        const passwordInput = await $('android=new UiSelector().resourceId("password-input")');
        await passwordInput.setValue('Abc@1234');

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
        // Select the "Numeric" question type using accessibility id
        const numericElement = await $('~Numeric');
        await numericElement.waitForDisplayed({ timeout: 5000 });
        await numericElement.click();
        // If the "Search" EditText appears, click on it and type "packegeAmrForm AUto"
    
        // Click on the "Question?" element
     

        // Click on "Save Form" using accessibility id
        const saveFormButton = await $('-android uiautomator:new UiSelector().description("Save Form")');
        await saveFormButton.waitForDisplayed({ timeout: 5000 });
        await saveFormButton.click();
        console.log('✅ Clicked on "Save Form".');
        driver.refresh(); // Refresh the driver to ensure the latest state is captured
        // Wait for the "Form saved successfully" message   
        const el1 = await driver.$('-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(0)');
        await el1.click();

    });

        it('assign form to client', async () => {
            // Assumes you are already logged in and on the Form Center screen
            const svgViewElement = await driver.$('-android uiautomator:new UiSelector().className("com.horcrux.svg.SvgView").instance(3)');
            await svgViewElement.waitForDisplayed({ timeout: 5000 });
            await svgViewElement.click();

            const sendToClientButton = await driver.$('accessibility id:Send To Client');
            await sendToClientButton.waitForDisplayed({ timeout: 5000 });
            await sendToClientButton.click();

            console.log('✅ Clicked on "Send To Client".');

            // Assert that android.widget.EditText appears
            const editText = await $('android.widget.EditText');
            await editText.waitForDisplayed({ timeout: 5000 });
            expect(await editText.isDisplayed()).to.be.true;

            // Wait for the form to appear in the list and click on it
       
        const selectAllButton = await driver.$("accessibility id:Select All");
        await selectAllButton.click();

        const selectPackageButton = await driver.$("accessibility id:Select a package");
        await selectPackageButton.click();

        const sendToClientOption = await driver.$('-android uiautomator:new UiSelector().text("Send to client")');
        await sendToClientOption.click();
          const pathViewElement = await driver.$('-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(0)');
        await pathViewElement.click();
        
         });

        it('search for form', async () => {

            const searchInput = await driver.$('class name:android.widget.EditText');
            await searchInput.waitForDisplayed({ timeout: 5000 });
            await searchInput.click();
            // Type "AUto" into the search input using pressKeyCode
        //     await driver.pressKeyCode(29, undefined, 1); // 'A' (metaState=1 for SHIFT on)
        //                 await driver.pause(1000); // Wait for search results to update
        //    await driver.pressKeyCode(94, undefined, 1); // 'u'
        //                 await driver.pause(1000); // Wait for search results to update
        //     await driver.pressKeyCode(48, undefined, 1); // 't' (lowercase, metaState=1 for SHIFT off)
        //                 await driver.pause(1000); // Wait for search results to update
        //     await driver.pressKeyCode(43); // 'o'
        //     await driver.pressKeyCode(66); // Enter key
        //     await driver.pause(1000); // Wait for search results to update
         });

       it('edite form', async () => {
        const svgViewElement = await driver.$('-android uiautomator:new UiSelector().className("com.horcrux.svg.SvgView").instance(3)');
        await svgViewElement.waitForDisplayed({ timeout: 5000 });
        await svgViewElement.click();
        const editButton = await driver.$('accessibility id:Edit');
        await editButton.waitForDisplayed({ timeout: 5000 });
        await editButton.click();
        const saveFormButton = await driver.$('accessibility id:Save Form');
        await saveFormButton.waitForDisplayed({ timeout: 5000 });
        await saveFormButton.click();

        console.log('✅ Clicked on "Save Form".');
        const viewGroupElement = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(17)');
        await viewGroupElement.waitForDisplayed({ timeout: 5000 });
        await viewGroupElement.click();

        const logoutButton = await driver.$("accessibility id:Logout");
        await logoutButton.waitForDisplayed({ timeout: 5000 });
        await logoutButton.click();

        const confirmYesButton = await driver.$("accessibility id:Yes");
        await confirmYesButton.waitForDisplayed({ timeout: 5000 });
        await confirmYesButton.click();
    });
});