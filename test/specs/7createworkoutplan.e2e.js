// import { expect } from 'chai';
// // import { faker } from '@faker-js/faker'; // Uncomment if needed

// async function clickWithRetry(element, retries = 3) {
//     while (retries > 0) {
//         try {
//             await element.click();
//             await driver.pause(2000); // Wait for 2 seconds
//             return;
//         } catch (error) {
//             console.error('Error clicking element:', error);
//             retries--;
//             if (retries === 0) throw error;
//         }
//     }
// }

// describe('Create Plan Flow', () => {
//     before(async () => {
//         await driver.startActivity('com.willma.staging', 'com.willma.staging.MainActivity');
//         console.log('App launched successfully.');

//         // Updated login using content-desc (more reliable than resource-id here)
//         const emailInput = await $('~email-input');
//         await emailInput.waitForDisplayed({ timeout: 60000 });
//         await emailInput.setValue('femojo8968@deenur.com');
//         console.log('Entered email.');

//         const passwordInput = await $('~password-input');
//         await passwordInput.waitForDisplayed({ timeout: 60000 });
//         await passwordInput.setValue('Willma123!');
//         console.log('Entered password.');

//         const signInButton = await $('~Sign In');
//         await signInButton.waitForDisplayed({ timeout: 60000 });
//         await signInButton.click();
//         console.log('Clicked on Sign In button.');

//         await runTest();
//     });

//     async function runTest() {
//         try {
//             const menuButton = await $('android=new UiSelector().resourceId("client-management-tab")');
//             await menuButton.waitForDisplayed({ timeout: 60000 });
//             await clickWithRetry(menuButton);
//             console.log('Clicked on client management menu.');

//             const searchInput = await $('//android.view.ViewGroup[3]');
//             await searchInput.waitForDisplayed({ timeout: 60000 });
//             await searchInput.click();
//             await driver.pause(1000);
//             await driver.pressKeyCode(29); // a
//             await driver.pressKeyCode(47); // u
//             await driver.pressKeyCode(48); // t
//             await driver.pressKeyCode(43); // o
//             await driver.pressKeyCode(66); // enter
//             await driver.pause(2000);

//             const profile = await $('android=new UiSelector().text("amrmoussaauto")');
//             await profile.waitForDisplayed({ timeout: 60000 });
//             await clickWithRetry(profile);
//             console.log('Selected profile.');

//             const packagesBtn = await $('~Packages');
//             await packagesBtn.waitForDisplayed({ timeout: 60000 });
//             await packagesBtn.click();

//             const selectPackage = await $('android=new UiSelector().className("android.widget.ImageView").instance(1)');
//             await selectPackage.waitForDisplayed({ timeout: 60000 });
//             await selectPackage.click();

//             const designNewPlanBtn = await $('~Design New Plan');
//             await designNewPlanBtn.waitForDisplayed({ timeout: 60000 });
//             await clickWithRetry(designNewPlanBtn);

//             const planNameInput = await $('android=new UiSelector().text("Enter plan name")');
//             await planNameInput.waitForDisplayed({ timeout: 30000 });
//             await planNameInput.click();
//             await planNameInput.setValue('Workout Plan Automation');
//             await driver.hideKeyboard();
//             console.log('Entered plan name.');

//             const durationInput = await $('android=new UiSelector().text("1")');
//             await durationInput.waitForDisplayed({ timeout: 30000 });
//             await durationInput.clearValue();
//             await durationInput.setValue('1');
//             console.log('Set duration.');

//             const addToQueueBtn = await $('android=new UiSelector().description("Add to active plans queue")');
//             await addToQueueBtn.waitForDisplayed({ timeout: 30000 });
//             await addToQueueBtn.click();

//             const workoutType = await $('//android.widget.TextView[contains(@text, "Workout")]');
//             await workoutType.waitForDisplayed({ timeout: 30000 });
//             await workoutType.click();
//             console.log('Selected workout plan type.');

//             const nextBtn = await $('~Next');
//             await nextBtn.waitForDisplayed({ timeout: 30000 });
//             await nextBtn.click();

//             const warningBtn = await $('android=new UiSelector().resourceId("android:id/button1")');
//             if (await warningBtn.isDisplayed()) {
//                 await warningBtn.click();
//                 console.log('Dismissed warning.');
//             }

//             for (let i = 1; i <= 7; i++) {
//                 const day = await $(`android=new UiSelector().description("Day ${i}")`);
//                 await day.waitForDisplayed({ timeout: 60000 });
//                 await clickWithRetry(day);

//                 const restSwitch = await $('//android.widget.Switch');
//                 if (await restSwitch.isDisplayed()) {
//                     await clickWithRetry(restSwitch);
//                 }
//             }

//             const addExercise = await $('~Add Exercise/s');
//             await addExercise.waitForDisplayed({ timeout: 60000 });
//             await clickWithRetry(addExercise);

//             const exerciseItem = await $('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[1]');
//             await exerciseItem.waitForDisplayed({ timeout: 60000 });
//             await clickWithRetry(exerciseItem);

//             const add1Exercise = await $('~Add 1 Exercise');
//             await add1Exercise.waitForDisplayed({ timeout: 60000 });
//             await clickWithRetry(add1Exercise);

//             const configureBtn = await $('(//android.view.ViewGroup[@content-desc="Configure"])[2]');
//             await configureBtn.waitForDisplayed({ timeout: 60000 });
//             await clickWithRetry(configureBtn);

//             const updateBtn = await $('~Update');
//             await updateBtn.waitForDisplayed({ timeout: 60000 });
//             await clickWithRetry(updateBtn);

//             const nextAfterConfig = await $('~Next');
//             await nextAfterConfig.waitForDisplayed({ timeout: 60000 });
//             await clickWithRetry(nextAfterConfig);

//             const formConfirm = await $('android=new UiSelector().resourceId("android:id/button1")');
//             if (await formConfirm.isDisplayed()) {
//                 await formConfirm.click();
//             }

//             const flowFormInput = await $('//android.widget.ScrollView[@content-desc="undefined flatlist"]/android.view.ViewGroup/android.view.ViewGroup[1]');
//             if (await flowFormInput.isDisplayed()) {
//                 await flowFormInput.click();
//             }

//             const scheduleNext = await $('~Next');
//             await scheduleNext.waitForDisplayed({ timeout: 60000 });
//             await scheduleNext.click();

//             const finishBtn = await $('~Schedule & Finish');
//             await finishBtn.waitForDisplayed({ timeout: 60000 });
//             await finishBtn.click();

//             const homeBtn = await $('~Home');
//             await homeBtn.waitForDisplayed({ timeout: 60000 });
//             await homeBtn.click();

//             const menu = await $('~menu-tab');
//             await menu.waitForDisplayed({ timeout: 60000 });
//             await menu.click();

//             const logout = await $('~Logout');
//             await logout.waitForDisplayed({ timeout: 60000 });
//             await logout.click();

//             const confirmLogout = await $('~Yes');
//             await confirmLogout.waitForDisplayed({ timeout: 60000 });
//             await confirmLogout.click();

//             console.log('✅ Workout plan creation flow completed successfully.');
//         } catch (error) {
//             console.error('❌ Test failed:', error);
//             throw error;
//         }
//     }

//     it('should create a complete workout plan with exercises and scheduling', async () => {
//         // Test flow executed in `before` hook
//     });
// });
