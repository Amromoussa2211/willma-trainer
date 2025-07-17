// import { expect } from 'chai';
// import { faker } from '@faker-js/faker';

// async function restartUiAutomator2Server() {
//     console.log('Restarting UiAutomator2 server...');
//     await driver.deleteSession(); // End the current session
//     await driver.startSession(); // Start a new session
//     console.log('UiAutomator2 server restarted.');
// }

// describe('Signup Flow', () => {
//     before(async () => {
//         try {
//             // Launch the app
//             await driver.startActivity(
//                 'com.willma.staging',
//                 'com.willma.staging.MainActivity'
//             );
//             console.log('App launched successfully.');
//         } catch (error) {
//             console.error('Error launching the app:', error);
//             await restartUiAutomator2Server(); // Restart UiAutomator2 if needed
//         }
//     });

//     it('analytic client POV', async () => {
//         // Enter email
//         const emailInput = await $('android=new UiSelector().resourceId("email-input")');
//         await emailInput.waitForDisplayed({ timeout: 5000 });
//         await emailInput.setValue('femojo8968@deenur.com');
//         // Enter password
//         const passwordInput = await $('android=new UiSelector().resourceId("password-input")');
//         await passwordInput.waitForDisplayed({ timeout: 5000 });
//         await passwordInput.setValue('Willma123!');
//         // Click on Sign In button
//         const signInButton = await $('android=new UiSelector().resourceId("login-button")');
//         await signInButton.waitForDisplayed({ timeout: 5000 });
//         await signInButton.click();

//         const clientsTab = await driver.$('accessibility id:Clients');
//         await clientsTab.click();

//         const newClientsButton = await driver.$('-android uiautomator:new UiSelector().text("New Clients")');
//         await newClientsButton.click();

//         const allTab = await driver.$('-android uiautomator:new UiSelector().text("All")');
//         await allTab.waitForDisplayed({ timeout: 5000 });
//         await allTab.click();

//         const homemenu = await driver.$('-android uiautomator:new UiSelector().text("Home")');
//         await homemenu.waitForDisplayed({ timeout: 5000 });
//         await homemenu.click();

//         const viewAllButtons = await $$('//android.widget.TextView[@text="view all"]');
//         if (viewAllButtons.length >= 0) {
//             await viewAllButtons.click();
//         }
        
//     });
//   });