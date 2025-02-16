// const { expect } = require('chai');

// describe('Create Plan Flow', () => {
//     before(async () => {
//         // Launch the app
//         await driver.startActivity(
//             'com.willma.staging',
//             'com.willma.staging.MainActivity'
//         );
//         console.log('App launched successfully.');

//         // Login steps
//         const emailInput = await $('//android.widget.EditText[@resource-id="email-input"]');
//         await emailInput.waitForDisplayed({ timeout: 60000 });
//         await emailInput.setValue('firkiyirti@gufum.com');
//         console.log('Entered email.');
//         expect(await emailInput.getText()).to.equal('firkiyirti@gufum.com');

//         const passwordInput = await $('//android.widget.EditText[@resource-id="password-input"]');
//         await passwordInput.setValue('P@$$w0rd2010');
//         console.log('Entered password.');
//         expect(await passwordInput.isDisplayed()).to.be.true;
//         expect(await passwordInput.isEnabled()).to.be.true;

//         const signInButton = await $('//android.view.ViewGroup[@content-desc="Sign In"]');
//         await signInButton.waitForDisplayed({ timeout: 20000 });
//         await signInButton.click();
//         console.log('Clicked on Sign In button.');
//     });

//     it('should create a complete workout plan with exercises and scheduling', async () => {
//         async function restartUiAutomator2Server() {
//             console.log('Restarting UiAutomator2 server...');
//             await driver.deleteSession();
//             await driver.startSession();
//             console.log('UiAutomator2 server restarted.');
//         }

//         async function runTest() {
//             try {
//                 // Navigation to plan creation
//                 const mainMenuIcon = await $('android=new UiSelector().className("com.horcrux.svg.PathView").instance(5)');
//                 await mainMenuIcon.waitForDisplayed({ timeout: 20000 });
//                 await mainMenuIcon.click();
//                 console.log('Clicked main menu icon');

//                 const profileSection = await $('//android.view.ViewGroup[@content-desc="Amrmoussa"]');
//                 await profileSection.waitForDisplayed({ timeout: 20000 });
//                 await profileSection.click();
//                 console.log('Accessed profile section');

//                 const plansTab = await $('~Plans');
//                 await plansTab.waitForDisplayed({ timeout: 20000 });
//                 await plansTab.click();
//                 console.log('Navigated to Plans section');

//                 // Plan creation flow
//                 const newPlanButton = await $('//android.view.ViewGroup[@content-desc="Design New Plan"]');
//                 await newPlanButton.waitForDisplayed({ timeout: 20000 });
//                 await newPlanButton.click();
//                 console.log('Started new plan creation');

//                 // Updated sequence using UiAutomator selectors
//                 const selectactiveplane = await $('android=new UiSelector().className("android.view.ViewGroup").instance(26)');
//                 await selectactiveplane.waitForDisplayed({ timeout: 10000 });
//                 await selectactiveplane.click();
//                 console.log('Clicked selectactiveplane');

//                 const el2 = await $('android=new UiSelector().text("Enter plan name")');
//                 await el2.waitForDisplayed({ timeout: 10000 });
//                 await el2.click();
//                 await el2.setValue('nutrationplan');
//                 console.log('Entered plan name');
//                 // expect(await el2.getText()).to.equal('automationplan');

//                 const el3 = await $('//android.widget.TextView[@text="Nutrition"]');
//                 await el3.waitForDisplayed({ timeout: 10000 });
//                 await el3.click();
//                 await el3.click(); // Double click if needed
//                 console.log('Selected nutration type twice');

//                 const el5 = await $('~Next');
//                 await el5.waitForDisplayed({ timeout: 10000 });
//                 await el5.click();
//                 console.log('Clicked Next button');

//                 const el1 = await driver.$("-android uiautomator:new UiSelector().description(\"Add Meal/s\").instance(0)");
//                 await el1.click();
//                 const el33 = await driver.$("-android uiautomator:new UiSelector().className(\"com.horcrux.svg.PathView\").instance(4)");
//                 await el33.click();
//                 const el113 = await driver.$("-android uiautomator:new UiSelector().text(\"Add Meal/s\").instance(0)");
//                 await el113.click();
//                 const el4 = await driver.$("-android uiautomator:new UiSelector().className(\"com.horcrux.svg.SvgView\").instance(7)");
//                 await el4.click();
//                 const el15 = await driver.$("-android uiautomator:new UiSelector().className(\"com.horcrux.svg.PathView\").instance(16)");
//                 await el15.click();
//                 const el6 = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(48)");
//                 await el6.click();
//                 const el7 = await driver.$("-android uiautomator:new UiSelector().text(\"Duplicate\")");
//                 await el7.click();
//                 const el8 = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(56)");
//                 await el8.click();
//                 const el9 = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(56)");
//                 await el9.click();
//                 const el10 = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(39)");
//                 await el10.click();
//             } catch (error) {
//                 console.error('Test failed:', error);
//                 if (error.message.includes("UiAutomator2 server because the instrumentation process is not running")) {
//                     await restartUiAutomator2Server();
//                     await runTest();
//                 } else {
//                     throw error;
//                 }
//             }
//         }

//         await runTest();
//     });
// });

// // Define appiumLogDir if required
// const appiumLogDir = 'path/to/log/dir'; // Update this path as needed