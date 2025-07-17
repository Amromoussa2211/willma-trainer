import { expect } from 'chai';
import { faker } from '@faker-js/faker';

async function clickWithRetry(element, retries = 3) {
  while (retries > 0) {
    try {
      await element.click();
      await driver.pause(2000);
      return;
    } catch (error) {
      console.error('Error clicking element:', error);
      retries--;
      if (retries === 0) throw error;
    }
  }
}

describe('Create Plan Flow', () => {
  before(async () => {
    await driver.startActivity('com.willma.staging', 'com.willma.staging.MainActivity');
    console.log('App launched successfully.');

    const emailInput = await $('android=new UiSelector().resourceId("email-input")');
    await emailInput.waitForDisplayed({ timeout: 10000 });
    await emailInput.setValue('femojo8968@deenur.com');

    const passwordInput = await $('android=new UiSelector().resourceId("password-input")');
    await passwordInput.waitForDisplayed({ timeout: 10000 });
    await passwordInput.setValue('Willma123!');

    const signInButton = await $('android=new UiSelector().description("Sign In")');
    await signInButton.waitForDisplayed({ timeout: 10000 });
    await signInButton.click();
  });

  async function restartUiAutomator2Server() {
    console.log('Restarting UiAutomator2 server...');
    await driver.deleteSession();
    await driver.startSession();
    console.log('UiAutomator2 server restarted.');
  }

  async function runTest() {
    try {
      let retries = 3;
      while (retries > 0) {
        try {
          const clientMenuBtn = await $('android=new UiSelector().resourceId("client-management-tab")');
          await clientMenuBtn.waitForDisplayed({ timeout: 10000 });
          await clientMenuBtn.click();
          break;
        } catch (error) {
          retries--;
          if (retries === 0) throw error;
          await restartUiAutomator2Server();
        }
      }

      const searchInput = await $('android=new UiSelector().className("android.view.ViewGroup").instance(3)');
      await searchInput.waitForDisplayed({ timeout: 10000 });
      await searchInput.click();
      await driver.pressKeyCode(29); // a
      await driver.pressKeyCode(47); // u
      await driver.pressKeyCode(48); // t
      await driver.pressKeyCode(43); // o
      await driver.pressKeyCode(66); // Enter
      await driver.pause(2000);

      // const profileSection = await $('android=new UiSelector().text("amrmoussaauto")');
      // await profileSection.waitForDisplayed({ timeout: 10000 });
      // await profileSection.click();

      const packages = await $('android=new UiSelector().description("Packages")');
      await packages.waitForDisplayed({ timeout: 10000 });
      await packages.click();

      const selectPackage = await $('android=new UiSelector().className("android.widget.ImageView").instance(1)');
      await selectPackage.waitForDisplayed({ timeout: 10000 });
      await selectPackage.click();

      const designNewPlan = await $('android=new UiSelector().description("Design New Plan")');
      await designNewPlan.waitForDisplayed({ timeout: 10000 });
      await designNewPlan.click();

      // const addToActiveQueue = await $('android=new UiSelector().description("Add to active plans queue")');
      // await addToActiveQueue.waitForDisplayed({ timeout: 10000 });
      // await addToActiveQueue.click();

      const planNameInput = await $('android=new UiSelector().text("Enter plan name")');
      await planNameInput.waitForDisplayed({ timeout: 10000 });
      await planNameInput.setValue('nutrationautoma');

      const nutritionOption = await $('android=new UiSelector().text("Nutrition")');
      await nutritionOption.waitForDisplayed({ timeout: 10000 });
      await nutritionOption.click();

      const nextBtn = await $('android=new UiSelector().description("Next")');
      await nextBtn.waitForDisplayed({ timeout: 10000 });
      await nextBtn.click();

      const warningBtn = await $('android=new UiSelector().resourceId("android:id/button1")');
      if (await warningBtn.isDisplayed()) {
        await warningBtn.click();
      }

      for (let i = 1; i <= 7; i++) {
        const day = await $(`android=new UiSelector().description("Day ${i}")`);
        await day.waitForDisplayed({ timeout: 10000 });
        await day.click();

        const addMeal = await $('android=new UiSelector().description("Add Meal/s")');
        await addMeal.waitForDisplayed({ timeout: 10000 });
        await addMeal.click();

        const cheatMeal = await $('android=new UiSelector().className("com.horcrux.svg.SvgView").instance(3)');
        await cheatMeal.waitForDisplayed({ timeout: 10000 });
        await cheatMeal.click();
      }

      // Add fruit meal (day 7 extended)
      const addMealBtn = await $('android=new UiSelector().text("Add Meal/s")');
      await addMealBtn.waitForDisplayed({ timeout: 10000 });
      await addMealBtn.click();

      const fruitCategory = await $('android=new UiSelector().text("Fruits")');
      await fruitCategory.waitForDisplayed({ timeout: 10000 });
      await fruitCategory.click();

      const specificFruit = await $('android=new UiSelector().className("android.view.ViewGroup").instance(3)');
      await specificFruit.waitForDisplayed({ timeout: 10000 });
      await specificFruit.click();

      const svgView = await $('android=new UiSelector().className("com.horcrux.svg.SvgView").instance(8)');
      await svgView.waitForDisplayed({ timeout: 10000 });
      await svgView.click();

      const searchField = await $('android=new UiSelector().text("Search")');
      await searchField.waitForDisplayed({ timeout: 10000 });
      await searchField.click();
      await searchField.addValue('orange');
      await driver.hideKeyboard();

      const resultItem = await $('android=new UiSelector().className("android.view.ViewGroup").instance(40)');
      await resultItem.waitForDisplayed({ timeout: 10000 });
      await resultItem.click();

      const confirmMeal = await $('android=new UiSelector().description("Next")');
      await confirmMeal.waitForDisplayed({ timeout: 10000 });
      await confirmMeal.click();

      await confirmMeal.click(); // Confirm again if needed

      const button1 = await $('android=new UiSelector().resourceId("android:id/button1")');
      if (await button1.isDisplayed()) {
        await button1.click();
      } else {
        const selectForm = await $('android=new UiSelector().className("android.view.ViewGroup").instance(21)');
        await selectForm.waitForDisplayed({ timeout: 10000 });
        await selectForm.click();
      }

      const flowForm = await $('android=new UiSelector().className("android.view.ViewGroup").instance(1)');
      await flowForm.waitForDisplayed({ timeout: 10000 });
      await flowForm.click();

      const scheduleNext = await $('android=new UiSelector().description("Next")');
      await scheduleNext.waitForDisplayed({ timeout: 10000 });
      await scheduleNext.click();

      const scheduleFinish = await $('android=new UiSelector().description("Schedule & Finish")');
      await scheduleFinish.waitForDisplayed({ timeout: 10000 });
      await scheduleFinish.click();

      const homeBtn = await $('android=new UiSelector().description("Home")');
      await homeBtn.waitForDisplayed({ timeout: 10000 });
      await homeBtn.click();

      const menuBtn = await $('android=new UiSelector().description("Menu")');
      await menuBtn.waitForDisplayed({ timeout: 10000 });
      await menuBtn.click();

      const logoutBtn = await $('android=new UiSelector().description("Logout")');
      await logoutBtn.waitForDisplayed({ timeout: 10000 });
      await logoutBtn.click();

      const confirmLogoutBtn = await $('android=new UiSelector().description("Yes")');
      await confirmLogoutBtn.waitForDisplayed({ timeout: 10000 });
      await confirmLogoutBtn.click();

    } catch (err) {
      console.error('Test failed:', err);
      throw err;
    }
  }

  it('should create a complete workout plan with exercises and scheduling', async () => {
    await runTest();
  });
});
