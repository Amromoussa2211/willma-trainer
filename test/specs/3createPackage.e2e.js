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
                await packageNameInput.setValue('automated Package');
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
                    await packageDescriptionInput.setValue('automated package descreption');
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

                    let isElementFound = false;
                    while (!isElementFound) {
                        try {
                            const addTagsElement = await $('//android.view.ViewGroup[@content-desc="Add up to 6 tags"]');
                            if (await addTagsElement.isDisplayed()) {
                                isElementFound = true;
                                await addTagsElement.click();
                                console.log('Clicked on "Add up to 6 tags" element.');
                                const strengthTrainingOption = await $('android=new UiSelector().text("Strength Training")');
                                await strengthTrainingOption.waitForDisplayed({ timeout: 60000 });
                                await strengthTrainingOption.click();
                                console.log('Clicked on "Strength Training" option.');
                            }
                        } catch (error) {
                            console.log('Element not found, scrolling...');
                            await driver.execute('mobile: scroll', { direction: 'down' });
                        }
                    }

            } catch (error) {
                console.error('Error interacting with the package description input:', error);
                throw error;
            }
              
                    // Step 6: Click on "Next" button
            const nextButton = await $('android=new UiSelector().description("Next")');
            await nextButton.waitForDisplayed({ timeout: 60000 });
            await nextButton.click();
            console.log('Clicked on "Next" button.');

            const selectItemElement = await driver.$('-android uiautomator:new UiSelector().text("Select item")');
            await selectItemElement.waitForDisplayed({ timeout: 60000 });
            await selectItemElement.click();
            console.log('Clicked on "Select item".');

            const packageFormElement = await driver.$('-android uiautomator:new UiSelector().text("packegeAmrForm AUto").instance(0)');
            await packageFormElement.waitForDisplayed({ timeout: 60000 });
            await packageFormElement.click();
            console.log('Clicked on "packegeAmrForm AUto".');

            const nextButtonElement1 = await driver.$('accessibility id:Next');
            await nextButtonElement1.waitForDisplayed({ timeout: 60000 });
            await nextButtonElement1.click();
            console.log('Clicked on "Next".');

            const inputFieldElement = await driver.$('class name:android.widget.EditText');
            await inputFieldElement.waitForDisplayed({ timeout: 60000 });
            await inputFieldElement.click();
            await inputFieldElement.addValue('1000');
            console.log('Entered value "1000".');

            const viewGroupElement = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(16)');
            await viewGroupElement.waitForDisplayed({ timeout: 60000 });
            await viewGroupElement.click();
            console.log('Clicked on element with instance 16.');

            const nextButtonElement2 = await driver.$('accessibility id:Next');
            await nextButtonElement2.waitForDisplayed({ timeout: 60000 });
            await nextButtonElement2.click();
            console.log('Clicked on "Next".');

            ///review page and uploadpackege photo 
            const uploadFileElementSelector = '//android.view.ViewGroup[@content-desc="Upload file, PNG, JPG (max size 5MB)"]';

            try {
                // Scroll to and click the upload element
                await driver.execute('mobile: scroll', { strategy: 'accessibility id', selector: 'Upload file, PNG, JPG (max size 5MB)' });
                const uploadFileElement = await $(uploadFileElementSelector);
                await uploadFileElement.waitForDisplayed({ timeout: 60000 });
                await uploadFileElement.click();
                console.log('✅ Clicked upload file element');
            } catch (error) {
                console.error('❌ Error with upload file element:', error);
                throw error;
            }
            
            // ✅ NEW: Wait for gallery to be fully open
            try {
                const galleryHeader = await $('android=new UiSelector().textContains("Photos")'); // adjust text if needed
                await galleryHeader.waitForDisplayed({ timeout: 10000 });
                console.log('✅ Gallery is fully open');
            } catch (error) {
                console.error('❌ Gallery did not open properly:', error);
                throw error;
            }
            
            // ✅ Now proceed to select an image
            try {
                let isGalleryItemFound = false;
            
                while (!isGalleryItemFound) {
                    await browser.pause(1000); // wait for items to render
            
                    const galleryItems = await $$('android=new UiSelector().className("com.oplus.gallery.business_lib.timeline.view.TimelineView")');
            
                    console.log(`📸 Found ${galleryItems.length} gallery items`);
            
                    for (const item of galleryItems) {
                        const desc = await item.getAttribute("contentDescription");
                        console.log('🔍 Checking item:', desc);
            
                        if (desc && desc.includes("Photo")) {
                            await item.click();
                            console.log('✅ Clicked image with "Photo" in description');
                            isGalleryItemFound = true;
                            break;
                        }
                    }
            
                    if (!isGalleryItemFound) {
                        console.log('🔁 Scrolling gallery to find more images...');
                        await driver.execute('mobile: scroll', { direction: 'down' });
                    }
                }
///////////////logout sequence

                const Nextafterreview = await driver.$("accessibility id:Next");
                await driver.execute('mobile: scroll', { strategy: 'accessibility id', selector: 'Next' });
                await Nextafterreview.waitForDisplayed({ timeout: 60000 });
                await Nextafterreview.click();
               console.log('✅ Clicked on "Next".');

                            const el2 = await driver.$("accessibility id:View Packages");
                            await el2.waitForDisplayed({ timeout: 60000 });
                            await el2.click();
                            console.log('✅ Clicked on "View Packages".');

                            const el3 = await driver.$('-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(0)');
                            await el3.waitForDisplayed({ timeout: 60000 });
                            await el3.click();
                            await el3.click();
                            console.log('✅ Clicked on first PathView.');

                            const el4 = await driver.$('-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(4)');
                            await el4.waitForDisplayed({ timeout: 60000 });
                            await el4.click();
                            console.log('✅ Clicked on fourth PathView.');

                            const el5 = await driver.$("accessibility id:Logout");
                            await el5.waitForDisplayed({ timeout: 60000 });
                            await el5.click();
                            console.log('✅ Clicked on "Logout".');

                            const el6 = await driver.$("accessibility id:Yes");
                            await el6.waitForDisplayed({ timeout: 60000 });
                            await el6.click();
                            console.log('✅ Clicked on "Yes".');

                 
                
            } catch (error) {
                console.error('❌ Error selecting image from gallery:', error);
                throw error;
            }
            
    await driver.pause(5000); // Adjust the pause time as needed
} catch (error) {
    console.error('Error during the sign-up process:', error);
    if (error.message.includes('UiAutomator2 server')) {
        await restartUiAutomator2Server(); // Restart UiAutomator2 if it crashes
    }
    throw error; // Rethrow the error to fail the test
}
    });
});