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

        const newTemplateButton = await $('//android.view.ViewGroup[@content-desc="New Template"]');
        await clickWithRetry(newTemplateButton);

     const newTemplateButtonn = await $('~New Template');
await clickWithRetry(newTemplateButtonn);

        const planNameInput = await $('//android.widget.EditText[@text="Enter plan name"]');
        const randomPlanName = `auto${Math.floor(100 + Math.random() * 900)}`;
        await setValueWithRetry(planNameInput, randomPlanName);

        const workoutButton = await $('//android.view.ViewGroup[@content-desc="Workout"]');
        await clickWithRetry(workoutButton);

        const nextButton = await $('//android.view.ViewGroup[@content-desc="Next"]');
        await clickWithRetry(nextButton);

        const day1Button = await driver.$('-android uiautomator:new UiSelector().description("Day 1")');
        await clickWithRetry(day1Button);

        const addExercisesButton = await driver.$('accessibility id:Add Exercise/s');
        await clickWithRetry(addExercisesButton);

        const firstExercise = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(36)');
        await clickWithRetry(firstExercise);

        const secondExercise = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(43)');
        await clickWithRetry(secondExercise);

       const addTwoExercises = await $('~Add 2 Exercises');
await clickWithRetry(addTwoExercises);



        const svgPathView = await driver.$('-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(2)');
        await clickWithRetry(svgPathView);

        const configureBtn = await driver.$('-android uiautomator:new UiSelector().text("Configure")');
        await clickWithRetry(configureBtn);

        const updateBtn = await driver.$('accessibility id:Update');
        await clickWithRetry(updateBtn);

        const confirmUpdateBtn = await driver.$('id:android:id/button1');
    //    await confirmUpdateBtn.isDisplayed()
            await clickWithRetry(confirmUpdateBtn);
        

        const duplicatePathView = await driver.$('-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(3)');
        await clickWithRetry(duplicatePathView);

        const duplicateTextButton = await driver.$('-android uiautomator:new UiSelector().text("Duplicate")');
        await clickWithRetry(duplicateTextButton);

        // const viewGroup29 = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(29)');
        // await clickWithRetry(viewGroup29);

        const week1Button = await $('~Week 1');
await clickWithRetry(week1Button);


        for (let i = 2; i <= 7; i++) {
            const dayButton = await driver.$(`-android uiautomator:new UiSelector().description("Day ${i}").instance(0)`);
            await clickWithRetry(dayButton);
        }

        const duplicateButton = await driver.$('accessibility id:Duplicate');
        await clickWithRetry(duplicateButton);

        const confirmBtnIfPresent = await driver.$('//android.widget.Button[@resource-id="android:id/button1"]');
        await clickWithRetry(confirmBtnIfPresent);

        await driver.pause(3000);

        const nextBtn = await driver.$('accessibility id:Next');
        await clickWithRetry(nextBtn);

        await driver.pause(3000);

        const createTemplateBtn = await driver.$('-android uiautomator:new UiSelector().text("Create Template")');
        await clickWithRetry(createTemplateBtn);

        // ✅ Wait until the button disappears
        await createTemplateBtn.waitForExist({ timeout: 30000, reverse: true });

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
