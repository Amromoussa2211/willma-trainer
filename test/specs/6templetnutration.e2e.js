import { expect } from 'chai';
import { faker } from '@faker-js/faker'; // Uncomment if needed
async function clickWithRetry(element, retries = 3) {
    while (retries > 0) {
        try {
            await element.waitForDisplayed({ timeout: 60000 });
            await element.click();
            return;
        } catch (error) {
            retries--;
            await driver.pause(1000);
        }
    }
    throw new Error('Element not clickable after retries.');
}

async function setValueWithRetry(element, value) {
    await element.waitForDisplayed({ timeout: 60000 });
    await element.setValue(value);
}

describe('templet workout', () => {
    before(async () => {
        await driver.startActivity('com.willma.staging', 'com.willma.staging.MainActivity');
    });

    it('should sign up successfully and create workout templet', async () => {
        const emailInput = await $('android=new UiSelector().resourceId("email-input")');
        await setValueWithRetry(emailInput, 'amr@test.test');

        const passwordInput = await $('android=new UiSelector().resourceId("password-input")');
        await setValueWithRetry(passwordInput, 'Abc@1234');

        const signInButton = await $('android=new UiSelector().resourceId("login-button")');
        await clickWithRetry(signInButton);

        const menuButton = await $('~menu-tab');
        await clickWithRetry(menuButton);

        const templateCenterButton = await $('~templates-button');
await clickWithRetry(templateCenterButton);
const newTemplateBtn = await driver.$('accessibility id:New Template');
await clickWithRetry(newTemplateBtn);


       const newNutritionTemplateButton = await driver.$('accessibility id:New Nutrition Template');
await clickWithRetry(newNutritionTemplateButton);


            const planNameInput = await $('android=new UiSelector().text("Enter plan name")');
            await clickWithRetry(planNameInput);
            const randomPlanName = `autoNut${Math.floor(Math.random() * 100000)}`;
            await planNameInput.addValue(randomPlanName);
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
     const backToHomeButton = await driver.$('-android uiautomator:new UiSelector().description("Back To Home")');
await clickWithRetry(backToHomeButton);

const menuTabButton = await driver.$('-android uiautomator:new UiSelector().resourceId("menu-tab")');
await clickWithRetry(menuTabButton);

const logoutButton = await driver.$('-android uiautomator:new UiSelector().description("logout-button")');
await clickWithRetry(logoutButton);

const confirmLogoutButton = await driver.$('-android uiautomator:new UiSelector().description("logout-confirmation-yes-button")');
await clickWithRetry(confirmLogoutButton);

    });
});
