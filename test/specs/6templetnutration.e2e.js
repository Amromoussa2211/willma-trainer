import { expect } from 'chai';

async function clickWithRetry(element, retries = 3) {
    while (retries > 0) {
        try {
            await element.waitForDisplayed({ timeout: 60000 });
            await element.click();
            return;
        } catch (error) {
            console.error('Error clicking element:', error);
            retries--;
            if (retries === 0) throw error;
            await driver.pause(1000);
        }
    }
}

async function setValueWithRetry(element, value, retries = 3) {
    while (retries > 0) {
        try {
            await element.waitForDisplayed({ timeout: 60000 });
            await element.setValue(value);
            return;
        } catch (error) {
            console.error('Error setting value:', error);
            retries--;
            if (retries === 0) throw error;
            await driver.pause(1000);
        }
    }
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
            await driver.startActivity('com.willma.staging', 'com.willma.staging.MainActivity');
            console.log('App launched successfully.');
        } catch (error) {
            console.error('Error launching the app:', error);
            await restartUiAutomator2Server();
        }
    });

    it('should sign up successfully and create nutrition template', async () => {
        try {
            const emailInput = await $('android=new UiSelector().resourceId("email-input")');
            await setValueWithRetry(emailInput, 'amr@test.test');

            const passwordInput = await $('android=new UiSelector().resourceId("password-input")');
            await setValueWithRetry(passwordInput, 'Abc@1234');

            const signInButton = await $('android=new UiSelector().resourceId("login-button")');
            await clickWithRetry(signInButton);

            await clickWithRetry(await $('accessibility id:Menu'));
            await clickWithRetry(await $('accessibility id:Template Center'));
            await clickWithRetry(await $('android=new UiSelector().text("Nutrition")'));
            await clickWithRetry(await $('accessibility id:New Template'));
            const newTemplateButton = await $('android=new UiSelector().text("New Nutrition Template")');
            await clickWithRetry(newTemplateButton);

            const planNameInput = await $('android=new UiSelector().text("Enter plan name")');
            await clickWithRetry(planNameInput);
            await planNameInput.addValue('nuttemplet');
//  const el1 = await driver.$("id:android:id/button1");
// await el1.click();
const el2 = await driver.$("-android uiautomator:new UiSelector().text(\"Nutrition\")");
await el2.click();
            await clickWithRetry(await $('accessibility id:Nutrition'));
            await clickWithRetry(await $('accessibility id:Next'));

            await clickWithRetry(await $('android=new UiSelector().description("Add Meal/s").instance(0)'));

            await clickWithRetry(await $('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/com.horcrux.svg.SvgView/com.horcrux.svg.GroupView/com.horcrux.svg.PathView'));
            await clickWithRetry(await $('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/com.horcrux.svg.SvgView'));

            await clickWithRetry(await $('android=new UiSelector().text("Fruits")'));
            await clickWithRetry(await $('accessibility id:Next'));

            await clickWithRetry(await $('android=new UiSelector().className("com.horcrux.svg.PathView").instance(4)'));
            await clickWithRetry(await $('android=new UiSelector().className("com.horcrux.svg.PathView").instance(3)'));
 const week1Button = await driver.$('accessibility id:Week 1');
        await clickWithRetry(week1Button);
            // Add to all days in week
           for (let i = 2; i <= 7; i++) {
    const dayButton = await driver.$(`android=new UiSelector().description("Day ${i}").instance(0)`);
    await clickWithRetry(dayButton);
}


            await clickWithRetry(await $('android=new UiSelector().description("Next")'));
            await clickWithRetry(await $('id:android:id/button1'));
            await clickWithRetry(await $('accessibility id:Next'));
            await clickWithRetry(await $('accessibility id:Create Template'));

            await clickWithRetry(await $('accessibility id:Home'));

            // Logout flow
            await clickWithRetry(await $('accessibility id:Menu'));
            await clickWithRetry(await $('accessibility id:Logout'));
            await clickWithRetry(await $('accessibility id:Yes'));

            console.log('✅ Test completed successfully.');
        } catch (error) {
            console.error('❌ Test failed:', error);
            await driver.saveScreenshot('./error-nutrition-template.png');
            throw error;
        }
    });
});
