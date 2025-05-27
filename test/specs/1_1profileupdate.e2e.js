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

    it('Update trainer profile', async () => {
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
        await menuButton.waitForDisplayed({ timeout: 10000 });
        await menuButton.click();
////////////////////////////////////////////////////////////////////////////////////////
const profileMenuGroup = await driver.$('-android uiautomator:new UiSelector().description("trainerAmr, View my Profile")');
await profileMenuGroup.waitForDisplayed({ timeout: 10000 });
await profileMenuGroup.click();

driver.refresh(); // Refresh the driver to ensure the latest UI state is captured
await driver.pause(2000); // Pause to allow the UI to settle
// Simple scroll down by swiping from near the bottom to near the top of the screen
// Alternative: Use scroll with UiScrollable if supported by your driver
await driver.$('android=new UiScrollable(new UiSelector().scrollable(true)).scrollForward()');
await driver.$('android=new UiScrollable(new UiSelector().scrollable(true)).scrollForward()');


const threedot = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(24)');
await threedot.waitForDisplayed({ timeout: 10000 });
await threedot.click();

const editProfileBtn = await driver.$('~Edit Profile');
await editProfileBtn.waitForDisplayed({ timeout: 10000 });
await editProfileBtn.click();

const editBtn = await driver.$('~Edit');
await editBtn.waitForDisplayed({ timeout: 10000 });
await editBtn.click();
    });
    it('Add spechialist', async () => {
const addSpecializationBtn = await driver.$('~+, Add Specialization');
await addSpecializationBtn.waitForDisplayed({ timeout: 10000 });
await addSpecializationBtn.click();

const nutritionistBtn = await driver.$('~Nutritionist');
await nutritionistBtn.waitForDisplayed({ timeout: 10000 });
await nutritionistBtn.click();

const yogaBtn = await driver.$('~Yoga');
await yogaBtn.waitForDisplayed({ timeout: 10000 });
await yogaBtn.click();

const selectBtn = await driver.$('-android uiautomator:new UiSelector().text("Select (2)")');
await selectBtn.waitForDisplayed({ timeout: 10000 });
await selectBtn.click();

const saveBtn = await driver.$('~Save');
await saveBtn.waitForDisplayed({ timeout: 10000 });
await saveBtn.click();

const editTextBtn = await driver.$('-android uiautomator:new UiSelector().text("Edit")');
await editTextBtn.waitForDisplayed({ timeout: 10000 });
await editTextBtn.click();
    });

it('update sochiallink ', async () => {
driver.refresh(); // Refresh the driver to ensure the latest UI state is captured
const anotherEditGroup = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(19)');
await anotherEditGroup.waitForDisplayed({ timeout: 10000 });
await anotherEditGroup.click();

await driver.action('pointer')
    .move({ duration: 0, x: 624, y: 1927 })
    .down({ button: 0 })
    .move({ duration: 1000, x: 615, y: 454 })
    .up({ button: 0 })
    .perform();

await driver.action('pointer')
    .move({ duration: 0, x: 596, y: 2106 })
    .down({ button: 0 })
    .move({ duration: 1000, x: 596, y: 835 })
    .up({ button: 0 })
    .perform();

await driver.action('pointer')
    .move({ duration: 0, x: 560, y: 1945 })
    .down({ button: 0 })
    .move({ duration: 1000, x: 560, y: 895 })
    .up({ button: 0 })
    .perform();

await driver.action('pointer')
    .move({ duration: 0, x: 523, y: 436 })
    .down({ button: 0 })
    .move({ duration: 1000, x: 505, y: 2312 })
    .up({ button: 0 })
    .perform();

await driver.action('pointer')
    .move({ duration: 0, x: 752, y: 491 })
    .down({ button: 0 })
    .move({ duration: 1000, x: 748, y: 812 })
    .up({ button: 0 })
    .perform();

const editTextBtn2 = await driver.$('-android uiautomator:new UiSelector().text("Edit").instance(1)');
await editTextBtn2.waitForDisplayed({ timeout: 10000 });
await editTextBtn2.click();


const addSocialBtn = await driver.$('-android uiautomator:new UiSelector().text("Add Social")');
await addSocialBtn.waitForDisplayed({ timeout: 10000 });
await addSocialBtn.click();

driver.scroll(0, 1); // Scroll down to find the "Other" button

const otherBtn = await driver.$('~Other');
await otherBtn.waitForDisplayed({ timeout: 10000 });
await otherBtn.click();

const socialGroup = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(37)');
await socialGroup.waitForDisplayed({ timeout: 10000 });
await socialGroup.click();

const viewGroup18 = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(18)');
await viewGroup18.waitForDisplayed({ timeout: 10000 });
await viewGroup18.click();
// await driver.refresh(); // Not supported in Appium for native apps
await driver.pause(2000); // Pause to allow the UI to update, or use a supported UI action if needed

const Done = await driver.$('-android uiautomator:new UiSelector().text("Done")');
await Done.waitForDisplayed({ timeout: 10000, interval: 500 });
await Done.click();
await Done.click();
        console.log('Profile updated successfully.');
const logoutButton = await driver.$("accessibility id:Logout");
                        await logoutButton.waitForDisplayed({ timeout: 1200000 });
                        await logoutButton.click();
                        const confirmLogoutButton = await driver.$("accessibility id:Yes");
                        await confirmLogoutButton.waitForDisplayed({ timeout: 1200000 });
                        await confirmLogoutButton.click();
                        console.log('Workout plan creation completed successfully');


    });
});