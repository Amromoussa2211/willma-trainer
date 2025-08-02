import { expect } from 'chai';
import { faker } from '@faker-js/faker';

// Helper: Wait for element, then click
async function waitAndClick(selector, timeout = 15000) {
    const el = await $(selector);
    await el.waitForDisplayed({ timeout });
    await driver.pause(500);
    await el.click();
    await driver.pause(500);
    return el;
}

// Helper: Wait for element, then set value
async function waitAndSetValue(selector, value, timeout = 15000) {
    const el = await $(selector);
    await el.waitForDisplayed({ timeout });
    await driver.pause(500);
    await el.setValue(value);
    await driver.pause(500);
    return el;
}

async function restartUiAutomator2Server() {
    console.log('Restarting UiAutomator2 server...');
    await driver.deleteSession();
    await driver.startSession();
    console.log('UiAutomator2 server restarted.');
}

describe('Signup Flow', () => {
    before(async () => {
        try {
            await driver.startActivity(
                'com.willma.staging',
                'com.willma.staging.MainActivity'
            );
            console.log('App launched successfully.');
        } catch (error) {
            console.error('Error launching the app:', error);
            await restartUiAutomator2Server();
        }
    });

    it('Update trainer profile', async () => {
        try {
            await waitAndSetValue('android=new UiSelector().resourceId("email-input")', 'amr@test.test');
            const emailInput = await $('android=new UiSelector().resourceId("email-input")');
            expect(await emailInput.getText()).to.equal('amr@test.test');

            await waitAndSetValue('android=new UiSelector().resourceId("password-input")', 'Abc@1234');
            // passwordInput.getText() may not work for password fields

            await waitAndClick('android=new UiSelector().resourceId("login-button")');

await waitAndClick('~menu-tab');

await waitAndClick('-android uiautomator:new UiSelector().text("View my Profile")');

            await driver.pause(2000);

            // Scroll twice
            await driver.$('android=new UiScrollable(new UiSelector().scrollable(true)).scrollForward()');
            await driver.pause(500);
            await driver.$('android=new UiScrollable(new UiSelector().scrollable(true)).scrollForward()');
            await driver.pause(500);

            await waitAndClick('-android uiautomator:new UiSelector().className("com.horcrux.svg.SvgView").instance(1)');

            await waitAndClick('~Edit Profile');

            // Assertion: Check if Edit Profile screen is displayed
            const editProfileHeader = await driver.$('-android uiautomator:new UiSelector().textContains("Edit Profile")');
            await editProfileHeader.waitForDisplayed({ timeout: 15000 });
            expect(await editProfileHeader.isDisplayed()).to.be.true;
        } catch (error) {
            await driver.saveScreenshot('./error-profile-update.png');
            throw error;
        }
    });

    it('Add specialist', async () => {
        // Add waits and assertions when you implement this
    });

    it('update social link', async () => {
        try {
            await driver.pause(2000);

           // await waitAndClick('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(19)');

            await driver.pause(1000);

            // Example swipe with wait
            await driver.action('pointer')
                .move({ duration: 0, x: 624, y: 1927 })
                .down({ button: 0 })
                .move({ duration: 1000, x: 615, y: 454 })
                .up({ button: 0 })
                .perform();
            await driver.pause(500);

            // await waitAndClick('-android uiautomator:new UiSelector().text("Edit").instance(1)');
await waitAndClick('(//android.widget.TextView[@text="Edit"])[2]');
await driver.pause(2000); // Optional: only keep if UI still needs to settle

            await waitAndClick('-android uiautomator:new UiSelector().text("Add Social")');
            await driver.pause(2000);

            await waitAndClick('-android uiautomator:new UiSelector().text("Facebook")');
            const facebookInput = await driver.$('-android uiautomator:new UiSelector().text("Facebook")');
            expect(await facebookInput.isDisplayed()).to.be.true;

           

           const el1 = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(18)");
await el1.click();
const el2 = await driver.$("-android uiautomator:new UiSelector().text(\"Cancel\")");
await el2.click();
const el3 = await driver.$("accessibility id:Yes, Discard");
await el3.click();
const el4 = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(24)");
await el4.click();

           

            // Logout flow with waits and assertions
await waitAndClick('~logout-button', 20000);
await waitAndClick('~logout-confirmation-yes-button', 20000);

            // Assertion: Check if login screen is displayed after logout
            const loginScreen = await driver.$('android=new UiSelector().resourceId("login-button")');
            await loginScreen.waitForDisplayed({ timeout: 15000 });
            expect(await loginScreen.isDisplayed()).to.be.true;

            console.log('Profile updated and logged out successfully.');
        } catch (error) {
            await driver.saveScreenshot('./error-social-link.png');
            throw error;
        }
    });
});