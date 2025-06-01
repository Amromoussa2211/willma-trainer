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
        await waitAndType('//android.widget.EditText[@resource-id="email-input"]', 'femojo8968@deenur.com');
        await waitAndType('//android.widget.EditText[@resource-id="password-input"]', 'Willma123!');
        await waitAndClick('//android.view.ViewGroup[@content-desc="Sign In"]');

        // Navigate to Packages
        await waitAndClick('//android.view.View[@content-desc="Menu"]');
        await waitAndClick('android=new UiSelector().text("Packages")');
        await waitAndClick('//android.view.ViewGroup[@content-desc="New Package"]');

        // Fill Package Info
        await waitAndType('android=new UiSelector().text("Enter package name")', 'automated Package');
        await scrollToText('Enter package description');
        await waitAndType('android=new UiSelector().text("Enter package description")', 'automated package description');

        // Select Package Types
        await waitAndClick('android=new UiSelector().text("Workout")');
        await waitAndClick('android=new UiSelector().text("Nutrition")');

        // Add Tags
        let tagsAdded = false;
        while (!tagsAdded) {
            try {
                const tagEl = await $('//android.view.ViewGroup[@content-desc="Add up to 6 tags"]');
                if (await tagEl.isDisplayed()) {
                    await tagEl.click();
                    await waitAndClick('android=new UiSelector().text("Strength Training")');
                    tagsAdded = true;
                }
            } catch {
                await driver.execute('mobile: scroll', { direction: 'down' });
            }
        }

        // Proceed
        await waitAndClick('android=new UiSelector().description("Next")');
        await waitAndClick('-android uiautomator:new UiSelector().text("Select item")');
        await waitAndClick('-android uiautomator:new UiSelector().text("packegeAmrForm AUto").instance(0)');
        await waitAndClick('accessibility id:Next');
        await waitAndType('class name:android.widget.EditText', '1000');
        await waitAndClick('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(16)');
        await waitAndClick('accessibility id:Next');

        // Upload Image
        await scrollToText('Upload file, PNG, JPG (max size 5MB)');
        await waitAndClick('//android.view.ViewGroup[@content-desc="Upload file, PNG, JPG (max size 5MB)"]');

        const galleryHeader = await $('android=new UiSelector().textContains("Photos")');
        await galleryHeader.waitForDisplayed({ timeout: 10000 });

        await clickThumbnailIfExists(); // 👈 This line calls the new helper

        // Finalize Package
        await scrollToText('Next');
        await waitAndClick('accessibility id:Next');
        await waitAndClick('accessibility id:View Packages');

        // Logout
        const targetElement = await $('//android.widget.FrameLayout//com.horcrux.svg.PathView');
        if (await targetElement.isDisplayed()) await targetElement.click();

        const instance13 = await $('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(13)');
        await instance13.waitForDisplayed({ timeout: 60000 });
        await instance13.click();

        await driver.back();
        await waitAndClick('accessibility id:Logout');
        await waitAndClick('accessibility id:Yes');
        console.log('✅ Logged out successfully');
    });
});
