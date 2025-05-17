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

                        // Click on "New Template"
                        const newTemplateButton = await $('//android.view.ViewGroup[@content-desc="New Template"]');
                        await newTemplateButton.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await newTemplateButton.click();
                        console.log('Clicked on New Template.');
                        await driver.pause(2000); // Wait after clicking

                        // Click on "New Workout Template"
                        const newWorkoutTemplateButton = await $('//android.view.ViewGroup[@content-desc="New Workout Template"]');
                        await newWorkoutTemplateButton.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await newWorkoutTemplateButton.click();
                        console.log('Clicked on New Workout Template.');

                        // Enter "templetworkout" in the plan name input
                        const planNameInput = await $('//android.widget.EditText[@text="Enter plan name"]');
                        await planNameInput.waitForDisplayed({ timeout: 60000 });
                        await planNameInput.setValue('templetworkout');
                        console.log('Entered plan name: templetworkout.');

                        // Click on "Workout"
                        const workoutButton = await $('//android.view.ViewGroup[@content-desc="Workout"]');
                        await workoutButton.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await workoutButton.click();
                        console.log('Clicked on Workout.');

                        // Click on "Next"
                        const nextButton = await $('//android.view.ViewGroup[@content-desc="Next"]');
                        await nextButton.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await nextButton.click();
                        console.log('Clicked on Next.');

                    
                         // Step 6: Select on Day 1
                         await driver.pause(2000); // Wait before clicking
                        // Select "Day 1"
                        const day1Button = await driver.$('-android uiautomator:new UiSelector().description("Day 1").instance(0)');
                        await day1Button.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await day1Button.click();
                        console.log('Clicked on Day 1.');

                        // Click on "Add Exercise/s"
                        const addExercisesButton = await driver.$('accessibility id:Add Exercise/s');
                        await addExercisesButton.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await addExercisesButton.click();
                        console.log('Clicked on Add Exercise/s.');

                        // Select the first exercise
                        const firstExercise = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(34)');
                        await firstExercise.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await firstExercise.click();
                        console.log('Selected the first exercise.');

                        // Select the second exercise
                        const secondExercise = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(41)');
                        await secondExercise.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await secondExercise.click();
                        console.log('Selected the second exercise.');

                        // Click on "Add 2 Exercises"
                        const addTwoExercisesButton = await driver.$('accessibility id:Add 2 Exercises');
                        await addTwoExercisesButton.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await addTwoExercisesButton.click();
                        console.log('Clicked on Add 2 Exercises.');

                        // Click on the SVG element
                        const svgElement = await driver.$('-android uiautomator:new UiSelector().className("com.horcrux.svg.SvgView").instance(2)');
                        await svgElement.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await svgElement.click();
                        console.log('Clicked on SVG element.');

                        // Click on "Configure"
                        const configureButton = await driver.$('-android uiautomator:new UiSelector().text("Configure")');
                        await configureButton.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await configureButton.click();
                        console.log('Clicked on Configure.');

                        // Click on "Update"
                        const updateButton = await driver.$('accessibility id:Update');
                        await updateButton.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await updateButton.click();
                        console.log('Clicked on Update.');

                        // Confirm the update
                        const confirmButton = await driver.$('id:android:id/button1');
                        await confirmButton.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await confirmButton.click();
                        console.log('Confirmed the update.');

                        // Iterate through Days 2 to 7 and toggle switches
                        for (let day = 2; day <= 7; day++) {
                            const dayButton = await driver.$(`accessibility id:Day ${day}`);
                            await dayButton.waitForDisplayed({ timeout: 60000 });
                            await driver.pause(2000); // Wait before clicking
                            await dayButton.click();
                            console.log(`Clicked on Day ${day}.`);

                            const daySwitch = await driver.$('class name:android.widget.Switch');
                            await daySwitch.waitForDisplayed({ timeout: 60000 });
                            await driver.pause(2000); // Wait before clicking
                            await daySwitch.click();
                            console.log(`Toggled switch for Day ${day}.`);
                        }

                        // Click on "Next"
                        const nextButtonFinal = await driver.$('accessibility id:Next');
                        await nextButtonFinal.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await nextButtonFinal.click();
                        console.log('Clicked on Next.');

                        // Click on "Create Template"
                        const createTemplateButton = await driver.$('accessibility id:Create Template');
                        await createTemplateButton.waitForDisplayed({ timeout: 60000 });
                        await driver.pause(2000); // Wait before clicking
                        await createTemplateButton.click();
                        console.log('Clicked on Create Template.');

                            // Click on "Home"
                            const homeButton = await driver.$('//android.view.ViewGroup[@content-desc="Home"]');
                            await homeButton.waitForDisplayed({ timeout: 60000 });
                            await driver.pause(2000); // Wait before clicking
                            await homeButton.click();
                            console.log('Clicked on Home.');

                            await menuButton.waitForDisplayed({ timeout: 60000 });           
                            await menuButton.click();  
                               console.log('Clicked on Menu button.');

                               const el5 = await driver.$("accessibility id:Logout");
                               await el5.waitForDisplayed({ timeout: 60000 });
                               await el5.click();
                               console.log('✅ Clicked on "Logout".');
   
                               const el6 = await driver.$("accessibility id:Yes");
                               await el6.waitForDisplayed({ timeout: 60000 });
                               await el6.click();
                               console.log('✅ Clicked on "Yes".');
   

    
           
                    } catch (error) {
                        console.error('Test failed:', error);
                        await driver.saveScreenshot('./error-workout-plan.png');
                        throw error;
                    }
                });
            });
            