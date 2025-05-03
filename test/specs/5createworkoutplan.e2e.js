import { expect } from 'chai';
import { faker } from '@faker-js/faker';




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
                  await emailInput.setValue('femojo8968@deenur.com');
                   console.log('Entered email.');
              
                   // Step 2: Enter password
                   const passwordInput = await $('//android.widget.EditText[@resource-id="password-input"]');
                   await passwordInput.waitForDisplayed({ timeout: 60000 });
                   await passwordInput.setValue('Willma123!');
                   console.log('Entered password.');
              
                   // Step 3: Click on Sign In button
                   const signInButton = await $('//android.view.ViewGroup[@content-desc="Sign In"]');
                   await signInButton.waitForDisplayed({ timeout: 60000 });
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
                    const Clientmenuebutton = await $('android=new UiSelector().resourceId("client-management-tab")');
                    await Clientmenuebutton.waitForDisplayed({ timeout: 1200000 });
                    if (await Clientmenuebutton.isDisplayed()) {
                        await driver.pause(2000); // Wait for 2 seconds
                        await Clientmenuebutton.click();
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

            
            const searchInput = await $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]');
            await searchInput.waitForDisplayed({ timeout: 60000 });
            await searchInput.click(); // Ensure the element is focused
            await driver.pause(1000); // Wait for 1 second before typing
        
            await searchInput.click(); // Ensure the element is focused
            await driver.pressKeyCode(29); // KeyEvent for 'a'
            await driver.pressKeyCode(47); // KeyEvent for 'u'
            await driver.pressKeyCode(48); // KeyEvent for 't'
            await driver.pressKeyCode(43); // KeyEvent for 'o'
            await driver.pressKeyCode(66); // KeyEvent for Enter
            await driver.pause(2000); // Wait for 2 seconds

            const profileSection = await $('-android uiautomator:new UiSelector().text("amrmoussaauto")');
      // or using XPath
      // const profileSection = await $('//android.widget.TextView[@text="amrmoussaauto"]');
            await profileSection.waitForDisplayed({ timeout: 60000 }); // Wait until the profile appears
            if (await profileSection.isDisplayed()) {
              await driver.pause(2000); // Wait for 2 seconds
              await profileSection.click();
              console.log('Accessed profile section');
            } else {
              console.error('Failed to access profile section: Amr Moussa not found');
              await driver.pause(2000); // Wait for 2 seconds before retrying or handling failure
            }

         

            const pakagess = await driver.$("accessibility id:Packages");
            await pakagess.waitForDisplayed({ timeout: 1200000 });
            await pakagess.click();

            const selectpackages = await driver.$("-android uiautomator:new UiSelector().className(\"android.widget.ImageView\").instance(1)");
            await selectpackages.waitForDisplayed({ timeout: 1200000 });
            await selectpackages.click();

            const Desinnewplan = await $('//android.view.ViewGroup[@content-desc="Design New Plan"]');
            await Desinnewplan.waitForDisplayed({ timeout: 1200000 });
            if (await Desinnewplan.isDisplayed()) {
              await driver.pause(2000); // Wait for 2 seconds
              await Desinnewplan.click();
              console.log('Navigated to Plans section');
            }

            const planNameField = await $('//android.widget.EditText[@text="Enter plan name"]');
            await planNameField.waitForDisplayed({ timeout: 30000 });
            await planNameField.click();
            await planNameField.setValue('Workout plan automated');
            console.log('Entered plan name "Workout plan".');
      
            // Close the keyboard
            await driver.hideKeyboard();
            console.log('Closed the keyboard.');
      
            // STEP 3.1: Update plan duration from "1" to "2"
            const planDurationField = await $('//android.widget.EditText[@text="1"]');
            await planDurationField.waitForDisplayed({ timeout: 30000 });
            await planDurationField.clearValue();
            await planDurationField.setValue('1');
            console.log('Updated plan duration to "1".');
       
            const addToActivePlansQueue = await $('android=new UiSelector().description("Add to active plans queue")');
            await addToActivePlansQueue.waitForDisplayed({ timeout: 30000 });
            await addToActivePlansQueue.click();
            console.log('Clicked on Add to active plans queue.');
            driver.pause(5000); // Wait for 2 seconds

            // Step 4: Select Workout plan type
            const workoutPlanType = await $('//android.widget.TextView[contains(@text, "Workout")]');
            await workoutPlanType.waitForDisplayed({ timeout: 30000 });
            await workoutPlanType.click();
            console.log('Selected Workout plan type.');

          

          
           // Your added sequence
      
            // Step 5: Click on Next
            const nextButton = await $('//android.view.ViewGroup[@content-desc="Next"]');
            await nextButton.waitForDisplayed({ timeout: 30000 });
            await nextButton.click();
            console.log('Clicked on Next.');

            const adjustineWarningMessage = await $('android=new UiSelector().resourceId("android:id/button1")');
            if (await adjustineWarningMessage.isDisplayed()) {
              await adjustineWarningMessage.waitForEnabled({ timeout: 90000 }); // Ensure the button is enabled
              await adjustineWarningMessage.click();
              console.log('Clicked on adjustineWarningMessage');
            } else {
              console.log('adjustineWarningMessage not displayed, continuing with the flow.');
            }
      
            // Step 6: Select on Day 1
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
            const button1 = await driver.$('-android uiautomator:new UiSelector().resourceId("android:id/button1")');
            await driver.pause(8000); // Wait for 2 seconds  

            if (await button1.isDisplayed()) {
              await button1.waitForEnabled({ timeout: 90000 }); // Ensure the button is enabled
              await button1.click();
              console.log('Clicked on button1');
            } else {
              const selectFormButton = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(21)");
              await selectFormButton.waitForDisplayed({ timeout: 1200000 });
              if (await selectFormButton.isDisplayed()) {
              await selectFormButton.click();
              console.log('Clicked on selectFormButton');
              }
            }
            const flowFormInput = await driver.$('//android.widget.ScrollView[@content-desc="undefined flatlist"]/android.view.ViewGroup/android.view.ViewGroup[1]');
            await flowFormInput.waitForDisplayed({ timeout: 1200000 }).catch(() => {
              console.log('Flow Form input not found, skipping this step.');
              return;
            });
            if (await flowFormInput.isDisplayed()) {
              await flowFormInput.click();
              console.log('Clicked on Flow Form input');
            } else {
              console.log('Flow Form input is not displayed, continuing with the flow.');
            }
            
          const scheduleNextButton = await driver.$("accessibility id:Next");
          await scheduleNextButton.waitForDisplayed({ timeout: 1200000 });
          await scheduleNextButton.click();
          const scheduleFinishButton = await driver.$("accessibility id:Schedule & Finish");
          await scheduleFinishButton.waitForDisplayed({ timeout: 1200000 });
          await scheduleFinishButton.click();
          const homeButton = await driver.$("accessibility id:Home");
          await homeButton.waitForDisplayed({ timeout: 1200000 });
          await homeButton.click();
          const menuButton = await driver.$("accessibility id:Menu");
          await menuButton.waitForDisplayed({ timeout: 1200000 });
          await menuButton.click();
          const logoutButton = await driver.$("accessibility id:Logout");
          await logoutButton.waitForDisplayed({ timeout: 1200000 });
          await logoutButton.click();
          const confirmLogoutButton = await driver.$("accessibility id:Yes");
          await confirmLogoutButton.waitForDisplayed({ timeout: 1200000 });
          await confirmLogoutButton.click();
          console.log('Workout plan creation completed successfully');
        } catch (error) {
          console.error('Test failed:', error);
          throw error;
        }
      }
      it('should create a complete workout plan with exercises and scheduling', async () => {
        //await runTest();
      });
    });