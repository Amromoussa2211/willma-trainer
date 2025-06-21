import { expect } from 'chai';

async function clickWithRetry(element, retries = 0) {
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

async function restartUiAutomator2Server() {
    console.log('Restarting UiAutomator2 server...');
    await driver.deleteSession(); // End the current session
    await driver.startSession(); // Start a new session
    console.log('UiAutomator2 server restarted.');
}

describe('Signup Flow', () => {
    before(async () => {
        try {
            // Launch the app
            await driver.startActivity(
                'com.willma.staging',
                'com.willma.staging.MainActivity'
            );
            console.log('App launched successfully.');
        } catch (error) {
            console.error('Error launching the app:', error);
            await restartUiAutomator2Server(); // Restart UiAutomator2 if needed
        }
    });

    it('should sign up successfully', async () => {
        try {
             //Wait for the sign-up button to appear
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

                   const menuButton = await $('//android.view.View[@content-desc="Menu"]');
                   await menuButton.waitForDisplayed({ timeout: 60000 });           
                     await menuButton.click();  
                        console.log('Clicked on Menu button.');

                        // Click on "Template Center"
                        const templateCenterButton = await $('//android.view.ViewGroup[@content-desc="Template Center"]');
                        await templateCenterButton.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await templateCenterButton.click();
                        console.log('Clicked on Template Center.');
                        await driver.pause(2000); // Wait after clicking

                        // Step 4: Perform the Nutrition Template flow
                        const nutritionButton = await driver.$('-android uiautomator:new UiSelector().text("Nutrition")');
                        await driver.pause(2000); // Wait before clicking
                        await nutritionButton.click();
                        console.log('Clicked on Nutrition.');

                        const newTemplateButton = await driver.$('accessibility id:New Template');
                        await driver.pause(2000); // Wait before clicking
                        await newTemplateButton.click();
                        console.log('Clicked on New Template.');

                        const newTemplateButtonAgain = await driver.$('accessibility id:New Template');
                        await driver.pause(2000); // Wait before clicking
                        await newTemplateButtonAgain.click();
                        console.log('Clicked on New Template again.');

                        const nutritionButtonAgain = await driver.$('-android uiautomator:new UiSelector().text("Nutrition")');
                        await driver.pause(2000); // Wait before clicking
                        await nutritionButtonAgain.click();
                        console.log('Clicked on Nutrition again.');

                        const planNameInput = await driver.$('-android uiautomator:new UiSelector().text("Enter plan name")');
                        await driver.pause(2000); // Wait before clicking
                        await planNameInput.click();
                        console.log('Clicked on Enter plan name.');
                        await planNameInput.addValue('nuttemplet');
                        console.log('Entered plan name.');

                        const nutritionTab = await driver.$('accessibility id:Nutrition');
                        await driver.pause(2000); // Wait before clicking
                        await nutritionTab.click();
                        console.log('Clicked on Nutrition.');

                        const nextButton = await driver.$('accessibility id:Next');
                        await driver.pause(2000); // Wait before clicking
                        await nextButton.click();
                        console.log('Clicked on Next.');

                        // Add the requested selector before instance26Button
                       

                        // const instance26Button = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(26)');
                        // await driver.pause(2000); // Wait before clicking
                        // await instance26Button.click();
                        // console.log('Clicked on instance 26.');

                        const addMealButton = await driver.$('-android uiautomator:new UiSelector().description("Add Meal/s").instance(0)');
                        await driver.pause(2000); // Wait before clicking
                        await addMealButton.click();
                        console.log('Clicked on Add Meal/s.');

                         const addingrediant = await driver.$('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/com.horcrux.svg.SvgView/com.horcrux.svg.GroupView/com.horcrux.svg.PathView');
                        await driver.pause(2000); // Wait before clicking
                        await addingrediant.click();
                        console.log('Clicked on custom PathView.');

                        const ingrediant2 = await driver.$('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/com.horcrux.svg.SvgView');
                        await driver.pause(2000); // Wait before clicking
                        await ingrediant2.click();
                        console.log('Clicked on SvgView.');

                        // const instance42Button = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(42)');
                        // await driver.pause(2000); // Wait before clicking
                        // await instance42Button.click();
                        // console.log('Clicked on instance 42.');

                        const fruitsButton = await driver.$('-android uiautomator:new UiSelector().text("Fruits")');
                        await driver.pause(2000); // Wait before clicking
                        await fruitsButton.click();
                        console.log('Clicked on Fruits.');

                        const nextButtonAgain = await driver.$('accessibility id:Next');
                        await driver.pause(2000); // Wait before clicking
                        await nextButtonAgain.click();
                        console.log('Clicked on Next.');

                        const pathViewInstance4 = await driver.$('-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(4)');
                        await driver.pause(2000); // Wait before clicking
                        await pathViewInstance4.click();
                        console.log('Clicked on PathView instance 4.');

                        const copyButton = await driver.$("-android uiautomator:new UiSelector().className(\"com.horcrux.svg.PathView\").instance(3)");;
                        await driver.pause(2000); // Wait before clicking
                        await copyButton.click();
                        console.log('Clicked on Copy.');
                        // Wait for "Week 1" element to appear and click
                        const week1Button = await driver.$('-android uiautomator:new UiSelector().description("Week 1")');
                        await week1Button.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await week1Button.click();
                        console.log('Clicked on Week 1.');

                        // Wait for "Day 2" element to appear and click
                        const day2Button = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(22)');
                        await day2Button.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await day2Button.click();
                        console.log('Clicked on Day 2.');
                        // Click on Day 3
                        const day3Button = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(24)');
                        await driver.pause(2000); // Wait before clicking
                        await day3Button.click();
                        console.log('Clicked on Day 3.');

                        // Click on Day 4
                        const day4Button = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(26)');
                        await driver.pause(2000); // Wait before clicking
                        await day4Button.click();
                        console.log('Clicked on Day 4.');

                        // Click on Day 5
                        const day5Button = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(28)');
                        await driver.pause(2000); // Wait before clicking
                        await day5Button.click();
                        console.log('Clicked on Day 5.');

                        // Click on Day 6
                        const day6Button = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(30)');
                        await driver.pause(2000); // Wait before clicking
                        await day6Button.click();
                        console.log('Clicked on Day 6.');

                        // Click on Day 7
                        const day7Button = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(32)');
                        await driver.pause(2000); // Wait before clicking
                        await day7Button.click();
                        console.log('Clicked on Day 7.');

                        // Click on Next
                        const nextButtonFinal = await driver.$('-android uiautomator:new UiSelector().description("Next")');
                        await driver.pause(2000); // Wait before clicking
                        await nextButtonFinal.click();
                        console.log('Clicked on Next.');

                        const button1 = await driver.$("id:android:id/button1");
                        await button1.click();
                        console.log('Clicked on button1.');

                        const nextButtonn = await driver.$("accessibility id:Next");
                        await nextButtonn.click();
                        console.log('Clicked on Next.');

                        const createTemplateButton = await driver.$("accessibility id:Create Template");
                        await createTemplateButton.click();
                        console.log('Clicked on Create Template.');

                        const homeButton = await driver.$("accessibility id:Home");
                        await homeButton.click();
                        console.log('Clicked on Home.');

                        const menuButtonn = await driver.$("accessibility id:Menu");
                        await menuButtonn.waitForDisplayed({ timeout: 1200000 });
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
                        await driver.saveScreenshot('./error-workout-plan.png');
                        throw error;
                    }
                });
            });
            