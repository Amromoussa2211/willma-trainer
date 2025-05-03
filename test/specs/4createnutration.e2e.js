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

            // Plan creation flow
            // Updated sequence using XPath selectors
            const selectactiveplane = await $('//android.view.ViewGroup[@content-desc="Add to active plans queue"]/android.view.ViewGroup');
            await selectactiveplane.waitForDisplayed({ timeout: 10000 });
            if (await selectactiveplane.isDisplayed()) {
                await selectactiveplane.click();
                console.log('Clicked selectactiveplane');
            }


                const el2 = await $('android=new UiSelector().text("Enter plan name")');
                await el2.waitForDisplayed({ timeout: 10000 });
                await el2.click();
                await el2.setValue('nutrationautoma');
                console.log('Entered plan name');

                const el3 = await $('//android.widget.TextView[@text="Nutrition"]');
                await el3.waitForDisplayed({ timeout: 10000 });
                await el3.click();
                await el3.click(); // Double click if needed
                console.log('Selected nutration type twice');

                const el5 = await $('~Next');
                await el5.waitForDisplayed({ timeout: 10000 });
                await el5.click();
                console.log('Clicked Next button');
                const adjustineWarningMessage = await $('//android.widget.Button[@resource-id="android:id/button1"]');
                if (await adjustineWarningMessage.isDisplayed()) {
                  await adjustineWarningMessage.waitForEnabled({ timeout: 9000 }); // Ensure the button is enabled
                  await adjustineWarningMessage.click();
                  console.log('Clicked on adjustineWarningMessage');
                } else {
                  console.log('adjustineWarningMessage not found, continuing...');
                }
               // Your added sequence
      const Day1 = await $('(//android.view.ViewGroup[@content-desc="Day 1"])[1]/android.view.ViewGroup');
      await Day1.waitForDisplayed({ timeout: 1200000 });
      //await clickWithRetry(Day1);
      await Day1.click();


      const Addmeal = await $('//android.view.ViewGroup[@content-desc="Add Meal/s"]');
      await Addmeal.waitForDisplayed({ timeout: 1200000 });
     // await clickWithRetry(Addmeal);
     await Addmeal.click();
    
     const cheetmeal = await driver.$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[5]/android.view.ViewGroup/android.view.ViewGroup/com.horcrux.svg.SvgView/com.horcrux.svg.GroupView/com.horcrux.svg.PathView');
     await cheetmeal.waitForDisplayed({ timeout: 1200000 });
      await cheetmeal.click();

     
         const Day2 = await $('//android.view.ViewGroup[@content-desc="Day 2"]');
         await Day2.waitForDisplayed({ timeout: 1200000 });
         await Day2.click();
         const Addmealday2 = await $('//android.view.ViewGroup[@content-desc="Add Meal/s"]');
         await Addmealday2.waitForDisplayed({ timeout: 1200000 });
          await Addmealday2.click();
            await cheetmeal.click();




            const Day3 = await $('//android.view.ViewGroup[@content-desc="Day 3"]');
            await Day3.waitForDisplayed({ timeout: 1200000 });
            await Day3.click();
            const Addmealday3 = await $('//android.view.ViewGroup[@content-desc="Add Meal/s"]');
            await Addmealday3.waitForDisplayed({ timeout: 1200000 });
             await Addmealday3.click();
               await cheetmeal.click();


                const Day4 = await $('//android.view.ViewGroup[@content-desc="Day 4"]');
                await Day4.waitForDisplayed({ timeout: 1200000 });
                await Day4.click();
                const Addmealday4 = await $('//android.view.ViewGroup[@content-desc="Add Meal/s"]');
                await Addmealday4.waitForDisplayed({ timeout: 1200000 });
                 await Addmealday4.click();
                   await cheetmeal.click();


                    const Day5 = await $('//android.view.ViewGroup[@content-desc="Day 5"]');
                    await Day5.waitForDisplayed({ timeout: 1200000 });
                    await Day5.click();
                    const Addmealday5 = await $('//android.view.ViewGroup[@content-desc="Add Meal/s"]');
                    await Addmealday5.waitForDisplayed({ timeout: 1200000 });
                     await Addmealday5.click();
                       await cheetmeal.click();


                        const Day6 = await $('//android.view.ViewGroup[@content-desc="Day 6"]');
                        await Day6.waitForDisplayed({ timeout: 1200000 });
                        await Day6.click();
                        const Addmealday6 = await $('//android.view.ViewGroup[@content-desc="Add Meal/s"]');
                        await Addmealday6.waitForDisplayed({ timeout: 1200000 });
                         await Addmealday6.click();
                           await cheetmeal.click();


                           const Day7 = await $('//android.view.ViewGroup[@content-desc="Day 7"]');
                           await Day7.waitForDisplayed({ timeout: 1200000 });
                           await Day7.click();
                           const Addmealday7 = await $('//android.view.ViewGroup[@content-desc="Add Meal/s"]');
                           await Addmealday7.waitForDisplayed({ timeout: 1200000 });
                            await Addmealday7.click();
                              await cheetmeal.click();
                              // adding ingrediant with search and chips in day 7
                             const addMealButton = await driver.$("-android uiautomator:new UiSelector().text(\"Add Meal/s\")");
                             await addMealButton.waitForDisplayed({ timeout: 1200000 });
                             await addMealButton.click();
                             const fruitsCategory = await driver.$("-android uiautomator:new UiSelector().text(\"Fruits\")");
                             await fruitsCategory.waitForDisplayed({ timeout: 1200000 });
                             await fruitsCategory.click();
                               const specificFruit = await driver.$("//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup");
                               await specificFruit.waitForDisplayed({ timeout: 1200000 });
                               await driver.pause(8000); // Wait for 2 seconds  

                               await specificFruit.click();
                             const svgElement = await driver.$("-android uiautomator:new UiSelector().className(\"com.horcrux.svg.SvgView\").instance(8)");
                             await svgElement.waitForDisplayed({ timeout: 1200000 });
                             await driver.pause(8000); // Wait for 2 seconds  
                             await svgElement.click(); // Click again to ensure the action is registered
                             const searchField = await driver.$("-android uiautomator:new UiSelector().text(\"Search\")");
                             await searchField.waitForDisplayed({ timeout: 1200000 });
                             await searchField.click();
                             await searchField.addValue("orange");
                            // Close the keyboard
                            await driver.hideKeyboard();

                            // Wait until the specified element is displayed
                            const targetElement = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(40)');
                            await targetElement.waitForDisplayed({ timeout: 1200000 });

                            // Click on the element
                            await targetElement.click();

                            // Pause for 3 seconds
                            await driver.pause(3000);
                             const searchResult = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(39)");
                             await searchResult.waitForDisplayed({ timeout: 1200000 });
                             await searchResult.click();
                             const selectedMeal = await driver.$("accessibility id:Next");
                             await selectedMeal.waitForDisplayed({ timeout: 1200000 });
                             await selectedMeal.click();
                             const nextButton = await driver.$("accessibility id:Next");
                             await nextButton.waitForDisplayed({ timeout: 1200000 });
                             await nextButton.click();
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
                                 const flowForm = await driver.$('//android.widget.ScrollView[@content-desc="undefined flatlist"]/android.view.ViewGroup/android.view.ViewGroup[1]');
                               await flowForm.waitForDisplayed({ timeout: 1200000 });
                               if (await flowForm.isDisplayed()) {
                                 await flowForm.click();
                                 console.log('Clicked on flowForm');
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
                                  } catch (error) {
                                    console.error('Test failed:', error);
                                    throw error;
                                  }
                                }
                                it('should create a complete workout plan with exercises and scheduling', async () => {
                                  //await runTest();
                                });
                              });
