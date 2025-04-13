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


                const createPackageButton = await $(`android=new UiSelector().text("Packages")`);
                await createPackageButton.waitForDisplayed({ timeout: 60000 }); 
                await createPackageButton.click();
                console.log('Clicked on Create Package button.');

                const newPackageButton = await $('//android.view.ViewGroup[@content-desc="New Package"]');   
                await newPackageButton.waitForDisplayed({ timeout: 60000 });
                await newPackageButton.click();
                console.log('Clicked on New Package button.');

                const packageNameInput = await $('android=new UiSelector().text("Enter package name")');
                await packageNameInput.waitForDisplayed({ timeout: 60000 });    
                await packageNameInput.setValue('Test Package Name');
                console.log('Entered package name.');
                
                const packageDescriptionInputSelector = 'android=new UiSelector().text("Enter package description")';

                try {
                    // Scroll to the element if it's not visible
                    await driver.execute('mobile: scroll', { strategy: 'accessibility id', selector: 'Enter package description' });
                    console.log('Scrolled to the package description input.');

                    // Wait for the element to appear
                    const packageDescriptionInput = await $(packageDescriptionInputSelector);
                    await packageDescriptionInput.waitForDisplayed({ timeout: 60000 });
                    console.log('Package description input is displayed.');

                    // Set value in the input field
                    await packageDescriptionInput.setValue('Test Package Description');
                    console.log('Entered package description.');

                    // Open the keyboard and press "Enter"
                    // await driver.pressKeyCode(66); // Keycode 66 corresponds to the "Enter" key on Android
                    // console.log('Pressed Enter key.');

                    // // Close the keyboard
                    // await driver.hideKeyboard();
                    // console.log('Closed the keyboard.');

                    const Packegetypeworkout = await $('android=new UiSelector().text("Workout")');  
                    await Packegetypeworkout.waitForDisplayed({ timeout: 60000 });
                    await Packegetypeworkout.click();
    
                    const Packegetypenutration = await $('android=new UiSelector().text("Nutrition")');  
                    await Packegetypenutration.waitForDisplayed({ timeout: 60000 });
                    await Packegetypenutration.click();

                   
               

                const targetElement = await $('android=new UiSelector().description("Add up to 6 tags")');
                await targetElement.waitForDisplayed({ timeout: 60000 });
                console.log('"Add up to 6 tags" element is displayed.');

                // Ensure the element is clickable
                if (await targetElement.isClickable()) {
                    await targetElement.click();
                    console.log('Clicked on the "Add up to 6 tags" element.');
                } else {
                    console.error('"Add up to 6 tags" element is not clickable.');
                }

                await targetElement.click();
                console.log('Clicked on the "Add up to 6 tags" element.');

                const tagOption = await $('android=new UiSelector().text("Weight Loss")');
                await tagOp
                tion.waitForDisplayed({ timeout: 60000 });
                await tagOption.click();
                console.log('Selected "Weight Loss" tag from the dropdown.');

            } catch (error) {
                console.error('Error interacting with the package description input:', error);
                throw error;
            }



                
                // Click on packageDescriptionInput to open the keyboard
                // await packageDescriptionInput.click();
                // console.log('Clicked on package description input to open the keyboard.');

                // Press back to close the keyboard
                // await driver.back();
                // console.log('Closed the keyboard by pressing back.');
                
                // const scrollView = await $('//android.widget.ScrollView/android.view.ViewGroup');
                // await scrollView.waitForDisplayed({ timeout: 60000 });
                // await scrollView.click(); // Click on the ScrollView to ensure it's in view
                // console.log('Clicked on ScrollView.');

        
              
              
            //       // Wait for the app to navigate to the next screen after login
               await driver.pause(5000); // Adjust the pause time as needed
            //     });
        } catch (error) {
            console.error('Error during the sign-up process:', error);
            if (error.message.includes('UiAutomator2 server')) {
                await restartUiAutomator2Server(); // Restart UiAutomator2 if it crashes
            }
            throw error; // Rethrow the error to fail the test
        }
    });
});