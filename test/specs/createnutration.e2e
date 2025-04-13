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
                await el2.click();
                await el2.setValue('nutrationplan');
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
                               
