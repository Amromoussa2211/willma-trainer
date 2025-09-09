import { expect } from 'chai';

// Helpers
async function clickWithRetry(element, retries = 3, delay = 2000) {
    while (retries > 0) {
        try {
            await element.click();
            await driver.pause(delay);
            return;
        } catch (error) {
            console.warn(`Retry click failed: ${retries} left`, error.message);
            retries--;
            if (retries === 0) throw error;
        }
    }
}

async function waitAndClick(selector, timeout = 60000) {
    const el = await $(selector);
    await el.waitForDisplayed({ timeout });
    await clickWithRetry(el);
}

async function waitAndType(selector, value, timeout = 60000) {
    const el = await $(selector);
    await el.waitForDisplayed({ timeout });
    await el.setValue(value);
}

async function restartUiAutomator2Server() {
    console.log('Restarting UiAutomator2 server...');
    await driver.deleteSession();
    await driver.startSession();
    console.log('Server restarted.');
}

async function scrollToText(text) {
    await driver.execute('mobile: scroll', {
        strategy: 'accessibility id',
        selector: text
    });
}

async function clickThumbnailIfExists() {
    const maxThumbnails = 5;
    for (let i = 0; i < maxThumbnails; i++) {
        try {
            const thumb = await $(`-android uiautomator:new UiSelector().resourceId("com.google.android.providers.media.module:id/icon_thumbnail").instance(${i})`);
            if (await thumb.isDisplayed()) {
                await thumb.click();
                console.log(`✅ Clicked thumbnail at instance ${i}`);
                await driver.pause(3000);
                return;
            }
        } catch (err) {
            // Continue trying other instances silently
        }
    }
    console.warn("⚠️ No thumbnail found to click.");
}

// Test Suite
describe('Signup & Create Package Flow', () => {
    before(async () => {
        try {
            await driver.startActivity('com.willma.staging', 'com.willma.staging.MainActivity');
            console.log('✅ App launched');
        } catch (err) {
            console.error('❌ App launch failed:', err);
            await restartUiAutomator2Server();
        }
    });

    it('should sign in and create a package successfully', async () => {
        // Sign in
        const emailInput = await $('android=new UiSelector().resourceId("email-input")');
        await emailInput.setValue('amr@test.test');

        // Enter password
        const passwordInput = await $('android=new UiSelector().resourceId("password-input")');
        await passwordInput.setValue('Abc@1234');

        // Click on Sign In button
        const signInButton = await $('android=new UiSelector().resourceId("login-button")');
        await signInButton.click();

        // Navigate to Packages
        await waitAndClick('~menu-tab');
        await waitAndClick('android=new UiSelector().text("Packages")');
        await waitAndClick('//android.view.ViewGroup[@content-desc="New Package"]');

        // Fill Package Info
        await waitAndType('android=new UiSelector().text("Enter package name")', 'automated Package');
        await scrollToText('Enter package description');
        await waitAndType('android=new UiSelector().text("Enter package description")', 'automated package description');

        // Select Package Types
        await waitAndClick('android=new UiSelector().text("Workout")');
        await waitAndClick('android=new UiSelector().text("Nutrition")');
        await waitAndClick("accessibility id:select-type");

        // Add Tags
        await waitAndClick("-android uiautomator:new UiSelector().text(\"Strength Training\")");

        // Proceed
        await waitAndClick('android=new UiSelector().description("Next")');
        await waitAndClick('accessibility id:Initial Form: Workout and Nutrition, Initial Form');
        await waitAndClick('accessibility id:Attach Form');
        await waitAndType('class name:android.widget.EditText', '1000');
        // await waitAndClick('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(16)');
await waitAndClick('~Next');

        // Upload Image
        await scrollToText('Upload file, PNG, JPG (max size 5MB)');
        const el1 = await driver.$("accessibility id:Upload file, PNG, JPG (max size 15MB)");
        await el1.click();
        const el2 = await driver.$("id:com.google.android.providers.media.module:id/icon_thumbnail");
        await el2.click();
        const el3 = await driver.$("accessibility id:Crop");
        await el3.click();

        // Finalize Package
        await scrollToText('Next');
        await waitAndClick('accessibility id:Create Package');
        await waitAndClick('accessibility id:View Packages');

        // Logout
        await driver.back();

              //  await driver.back();
            await waitAndClick('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(14)');
            
            await waitAndClick('accessibility id:main-profile-button');
            await waitAndClick('-android uiautomator:new UiSelector().className("com.horcrux.svg.SvgView").instance(0)');
            await waitAndClick('-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(5)');
        await waitAndClick('~logout-button', 20000);
        await waitAndClick('~logout-confirmation-yes-button', 20000);
        console.log('✅ Logged out successfully');
    });
});
