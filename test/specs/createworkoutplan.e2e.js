const { expect } = require('chai');

async function clickWithRetry(element, retries = 3) {
  while (retries > 0) {
    try {
      await element.click();
      await driver.pause(2000); // Wait for 2 seconds
      return;
    } catch (error) {
      console.error('Error clicking element:', error);
      retries--;
      if (retries === 0) throw error; // Rethrow error if out of retries
    }
  }
}

describe('Create Plan Flow', () => {
  before(async () => {
    // Launch the app
    await driver.startActivity(
      'com.willma.staging',
      'com.willma.staging.MainActivity'
    );
    console.log('App launched successfully.');
    // Login steps
    const emailInput = await $('//android.widget.EditText[@resource-id="email-input"]');
    await emailInput.waitForDisplayed({ timeout: 60000 });
    await emailInput.setValue('firkiyirti@gufum.com');
    console.log('Entered email.');
    expect(await emailInput.getText()).to.equal('firkiyirti@gufum.com');

    const passwordInput = await $('//android.widget.EditText[@resource-id="password-input"]');
    await passwordInput.setValue('P@$$w0rd2010');
    console.log('Entered password.');

    const signInButton = await $('//android.view.ViewGroup[@content-desc="Sign In"]');
    await signInButton.waitForDisplayed({ timeout: 20000 });
    await signInButton.click();
    console.log('Clicked on Sign In button.');
    await runTest();
  });

  async function restartUiAutomator2Server() {
    console.log('Restarting UiAutomator2 server...');
    await driver.deleteSession();
    await driver.startSession();
    console.log('UiAutomator2 server restarted.');
  }

  async function runTest() {
    try {
      // Navigation to plan creation
      let retries = 3;
      while (retries > 0) {
        try {
          const mainMenuIcon = await $('android=new UiSelector().className("com.horcrux.svg.PathView").instance(5)');
          await mainMenuIcon.waitForDisplayed({ timeout: 1200000 });
          if (await mainMenuIcon.isDisplayed()) {
            await driver.pause(2000); // Wait for 2 seconds
            await mainMenuIcon.click();
            console.log('Clicked main menu icon');
            break; // Exit loop if successful
          }
        } catch (error) {
          console.error('Error clicking main menu icon:', error);
          retries--;
          if (retries === 0) throw error; // Rethrow error if out of retries
          // Restart the UiAutomator2 server if it crashes
          await restartUiAutomator2Server();
        }
      }

      const profileSection = await $('//android.view.ViewGroup[@content-desc="Amrmoussa"]');
      await profileSection.waitForDisplayed({ timeout: 60000 }); // Increase timeout to 60 seconds
      if (await profileSection.isDisplayed()) {
        await driver.pause(2000); // Wait for 2 seconds
        await profileSection.click();
        console.log('Accessed profile section');
      }

      const plansTab = await $('~Plans');
      await plansTab.waitForDisplayed({ timeout: 1200000 });
      if (await plansTab.isDisplayed()) {
        await driver.pause(2000); // Wait for 2 seconds
        await plansTab.click();
        console.log('Navigated to Plans section');
      }

      // Plan creation flow
      // Wait for loading indicator to disappear
      const loadingIndicator = await $('//android.view.ViewGroup[@content-desc="Loading Indicator"]');
      await loadingIndicator.waitForDisplayed({ timeout: 1200000, reverse: true });

      const newPlanButton = await $('//android.view.ViewGroup[@content-desc="Design New Plan"]');
      await newPlanButton.waitForDisplayed({ timeout: 1200000 });
      if (await newPlanButton.isDisplayed()) {
        await clickWithRetry(newPlanButton);
        //expect(await newPlanButton.isDisplayed()).to.be.true;
        console.log('Started new plan creation');
      }

      // Updated sequence using XPath selectors
      const selectactiveplane = await $('//android.view.ViewGroup[@content-desc="Add to active plans queue"]/android.view.ViewGroup');
      await selectactiveplane.waitForDisplayed({ timeout: 10000 });
      if (await selectactiveplane.isDisplayed()) {
        await selectactiveplane.click();
        console.log('Clicked selectactiveplane');
      }

      const el2 = await $('android=new UiSelector().text("Enter plan name")');
      await el2.waitForDisplayed({ timeout: 10000 });
      if (await el2.isDisplayed()) {
        await el2.click();
        await el2.setValue('automationplan');
        console.log('Entered plan name');
      }

      const el3 = await $('android=new UiSelector().text("Workout")');
      await el3.waitForDisplayed({ timeout: 10000 });
      if (await el3.isDisplayed()) {
        await el3.click();
        await el3.click(); // Double click if needed
        console.log('Selected workout type twice');
      }

      const el5next = await $('~Next');
      await el5next.waitForDisplayed({ timeout: 10000 });
      if (await el5next.isDisplayed()) {
        await el5next.click();
        console.log('Clicked Next button');
      }

      const el5 = await $('//android.view.ViewGroup[@content-desc="Next"]');
      await el5.waitForDisplayed({ timeout: 1200000 });
      if (await el5.isDisplayed()) {
        await clickWithRetry(el5);
        console.log('Clicked Next button');
      }

      // Your added sequence
      const Day1 = await $('(//android.view.ViewGroup[@content-desc="Day 1"])[1]/android.view.ViewGroup');
      const Restdayswitch = await $('//android.widget.Switch');
      await Restdayswitch.waitForDisplayed({ timeout: 1200000 });
      await Day1.waitForDisplayed({ timeout: 1200000 });
      if (await Day1.isDisplayed()) {
        await clickWithRetry(Day1);
        if (await Restdayswitch.isDisplayed()) {
          await clickWithRetry(Restdayswitch);
        }
      }

      const Day2 = await $('//android.view.ViewGroup[@content-desc="Day 2"]');
      const Restday2switch = await $('//android.widget.Switch');
      await Restday2switch.waitForDisplayed({ timeout: 1200000 });
      await Day2.waitForDisplayed({ timeout: 1200000 });
      if (await Day2.isDisplayed()) {
        await clickWithRetry(Day2);
        if (await Restdayswitch.isDisplayed()) {
          await clickWithRetry(Restdayswitch);
        }
      }
      

      

      const el4 = await $('//android.view.ViewGroup[@content-desc="Day 3"]');
      await el4.waitForDisplayed({ timeout: 1200000 });
      if (await el4.isDisplayed()) {
        await clickWithRetry(el4);
      }

      const el5_new = await $('//android.widget.Switch');
      await el5_new.waitForDisplayed({ timeout: 1200000 });
      if (await el5_new.isDisplayed()) {
        await clickWithRetry(el5_new);
      }

      const el6 = await $('//android.view.ViewGroup[@content-desc="Day 4"]');
      await el6.waitForDisplayed({ timeout: 1200000 });
      if (await el6.isDisplayed()) {
        await clickWithRetry(el6);
      }

      const el7 = await $('//android.widget.Switch');
      await el7.waitForDisplayed({ timeout: 1200000 });
      if (await el7.isDisplayed()) {
        await clickWithRetry(el7);
      }

      const el8 = await $('//android.view.ViewGroup[@content-desc="Day 5"]');
      await el8.waitForDisplayed({ timeout: 1200000 });
      if (await el8.isDisplayed()) {
        await clickWithRetry(el8);
      }

      const el9 = await $('//android.widget.Switch');
      await el9.waitForDisplayed({ timeout: 1200000 });
      if (await el9.isDisplayed()) {
        await clickWithRetry(el9);
      }

      const el10 = await $('//android.widget.TextView[@text="Day 6"]');
      await el10.waitForDisplayed({ timeout: 1200000 });
      if (await el10.isDisplayed()) {
        await clickWithRetry(el10);
      }

      const el11 = await $('//android.widget.Switch');
      await el11.waitForDisplayed({ timeout: 1200000 });
      if (await el11.isDisplayed()) {
        await clickWithRetry(el11);
      }

      const el13 = await $('//android.widget.TextView[@text="Day 7"]');
      await el13.waitForDisplayed({ timeout: 1200000 });
      if (await el13.isDisplayed()) {
        await clickWithRetry(el13);
      }

      const addExerciseButton = await $('//android.view.ViewGroup[@content-desc="Add Exercise/s"]');
      await addExerciseButton.waitForDisplayed({ timeout: 1200000 });
      if (await addExerciseButton.isDisplayed()) {
        await clickWithRetry(addExerciseButton);
      }

      const exerciseGroup = await $('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[1]');
      await exerciseGroup.waitForDisplayed({ timeout: 1200000 });
      if (await exerciseGroup.isDisplayed()) {
        await clickWithRetry(exerciseGroup);
        console.log('Clicked exercise group');
      }

      const addOneExerciseButton = await $('//android.view.ViewGroup[@content-desc="Add 1 Exercise"]');
      await addOneExerciseButton.waitForDisplayed({ timeout: 1200000 });
      if (await addOneExerciseButton.isDisplayed()) {
        await clickWithRetry(addOneExerciseButton);
      }

      const configureButton = await $('(//android.view.ViewGroup[@content-desc="Configure"])[2]');
      await configureButton.waitForDisplayed({ timeout: 1200000 });
      if (await configureButton.isDisplayed()) {
        await clickWithRetry(configureButton);
      }

      const updateButton = await $('//android.view.ViewGroup[@content-desc="Update"]');
      await updateButton.waitForDisplayed({ timeout: 1200000 });
      if (await updateButton.isDisplayed()) {
        await clickWithRetry(updateButton);
      }
      // const okmessage = await $('//android.widget.Button[@resource-id="android:id/button1"]');
      // await okmessage.waitForDisplayed({ timeout: 1200000 }).catch(() => {
      //   console.log('OK message not found, proceeding to next step.');
      // });
      // if (await okmessage.isDisplayed()) {
      //   await clickWithRetry(okmessage);
      // } else {
      //   console.log('OK message not found, proceeding to next step.');
      // }
       const nextafterconfigure = await $('//android.view.ViewGroup[@content-desc="Next"]');
      await nextafterconfigure.waitForDisplayed({ timeout: 1200000 });
      if (await nextafterconfigure.isDisplayed()) {
        await clickWithRetry(nextafterconfigure);
      }

      // const nextafterfinshplan = await $('//android.view.ViewGroup[@content-desc="Next"]');
      // await nextafterfinshplan.waitForDisplayed({ timeout: 1200000 });
      // if (await nextafterfinshplan.isDisplayed()) {
      //   await clickWithRetry(nextafterfinshplan);
      // }

      const nextButtonform = await $('//android.view.ViewGroup[@content-desc="Next"]');
      await nextButtonform.waitForDisplayed({ timeout: 1200000 });
      if (await nextButtonform.isDisplayed()) {
        await clickWithRetry(nextButtonform);
      }

      const finshandscadual = await $('//android.view.ViewGroup[@content-desc="Schedule & Finish"]');
      await finshandscadual.waitForDisplayed({ timeout: 1200000 });
      if (await finshandscadual.isDisplayed()) {
        await clickWithRetry(finshandscadual);
      }

      const homescreenafterplan = await $('//android.view.ViewGroup[@content-desc="Home"]');
      await homescreenafterplan.waitForDisplayed({ timeout: 1200000 });
      if (await homescreenafterplan.isDisplayed()) {
        await clickWithRetry(homescreenafterplan);
      }
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  }

  it('should create a complete workout plan with exercises and scheduling', async () => {
    await runTest();
  });
});

