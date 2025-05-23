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
                    // Select and click the first exercise (el1)
                    const firstExercise = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(35)');
                    await firstExercise.waitForDisplayed({ timeout: 60000 });
                    await firstExercise.click();

                    // Select and click the second exercise (el2)
                    const secondExercise = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(42)');
                    await secondExercise.waitForDisplayed({ timeout: 60000 });
                    await secondExercise.click();

                    // Click on "Add 2 Exercises" (el3)
                    const addTwoExercises = await driver.$('accessibility id:Add 2 Exercises');
                    await addTwoExercises.waitForDisplayed({ timeout: 60000 });
                    await addTwoExercises.click();

                    // Click on the SVG PathView element (el4)
                    const svgPathView = await driver.$('-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(2)');
                    await svgPathView.waitForDisplayed({ timeout: 60000 });
                    await svgPathView.click();

                    // Click on "Configure" (el5)
                    const configureBtn = await driver.$('-android uiautomator:new UiSelector().text("Configure")');
                    await configureBtn.waitForDisplayed({ timeout: 60000 });
                    await configureBtn.click();

                    // Click on "Update" (el6)
                    const updateBtn = await driver.$('accessibility id:Update');
                    await updateBtn.waitForDisplayed({ timeout: 60000 });
                    await updateBtn.click();

                    // Confirm the update (el7)
                    const confirmUpdateBtn = await driver.$('id:android:id/button1');
                    await confirmUpdateBtn.waitForDisplayed({ timeout: 60000 });
                    await confirmUpdateBtn.click();
                    const duplicatePathView = await driver.$('-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(3)');
                    await duplicatePathView.click();

                    const duplicateTextButton = await driver.$('-android uiautomator:new UiSelector().text("Duplicate")');
                    await duplicateTextButton.click();

                    const viewGroup29 = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(29)');
                    await viewGroup29.click();

                    const week1Button = await driver.$('accessibility id:Week 1');
                    await week1Button.click();

                    const day2Button = await driver.$('-android uiautomator:new UiSelector().description("Day 2").instance(0)');
                    await day2Button.click();

                    const day3Button = await driver.$('-android uiautomator:new UiSelector().description("Day 3").instance(0)');
                    await day3Button.click();

                    const day4Button = await driver.$('-android uiautomator:new UiSelector().description("Day 4").instance(0)');
                    await day4Button.click();

                    const day5Button = await driver.$('-android uiautomator:new UiSelector().description("Day 5").instance(0)');
                    await day5Button.click();

                    const day6Button = await driver.$('-android uiautomator:new UiSelector().description("Day 6").instance(0)');
                    await day6Button.click();

                    const day7Button = await driver.$('-android uiautomator:new UiSelector().description("Day 7").instance(0)');
                    await day7Button.click();

                    const duplicateButton = await driver.$('accessibility id:Duplicate');
                    await duplicateButton.click();

                    const confirmBtnIfPresent = await driver.$('//android.widget.Button[@resource-id="android:id/button1"]');
                    const isConfirmBtnDisplayed = await confirmBtnIfPresent.isDisplayed().catch(() => false);
                    expect(isConfirmBtnDisplayed).to.be.a('boolean');
                    if (isConfirmBtnDisplayed) {
                        await confirmBtnIfPresent.click();
                        console.log('Clicked on confirm button (android:id/button1).');
                    }
                    const nextBtn = await driver.$('accessibility id:Next');
                    await nextBtn.waitForDisplayed({ timeout: 60000 });
                    await driver.pause(2000);
                    await nextBtn.click();

                    const createTemplateBtn = await driver.$('-android uiautomator:new UiSelector().text("Create Template")');
                    await createTemplateBtn.waitForDisplayed({ timeout: 60000 });
                    await driver.pause(2000);
                    await createTemplateBtn.click();

                    const homeBtn = await driver.$('accessibility id:Home');
                    await homeBtn.waitForDisplayed({ timeout: 60000 });
                    await driver.pause(2000);
                    await homeBtn.click();

                    const svgPathView8 = await driver.$('-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(8)');
                    await svgPathView8.waitForDisplayed({ timeout: 60000 });
                    await driver.pause(2000);
                    await svgPathView8.click();

                    const logoutBtn = await driver.$('accessibility id:Logout');
                    await logoutBtn.waitForDisplayed({ timeout: 60000 });
                    await driver.pause(2000);
                    await logoutBtn.click();

                    const yesBtn = await driver.$('accessibility id:Yes');
                    await yesBtn.waitForDisplayed({ timeout: 60000 });
                    await driver.pause(2000);
                    await yesBtn.click();
           
                    } catch (error) {
                        console.error('Test failed:', error);
                        await driver.saveScreenshot('./error-workout-plan.png');
                        throw error;
                    }
                });
            });
            