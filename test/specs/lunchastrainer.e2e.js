describe('Create Package Flow', () => {
    before(async () => {
      // Launch the app
      await driver.startActivity(
        'com.willma.staging',
        'com.willma.staging.MainActivity'
      );
      console.log('App launched successfully.');
  
      // Step 1: Enter email
      const emailInput = await $('//android.widget.EditText[@resource-id="email-input"]');
      await emailInput.waitForDisplayed({ timeout: 60000 });
      await emailInput.setValue('kirollosghaly12@gmail.com');
      console.log('Entered email.');
  
      // Step 2: Enter password
      const passwordInput = await $('//android.widget.EditText[@resource-id="password-input"]');
      await passwordInput.waitForDisplayed({ timeout: 60000 });
      await passwordInput.setValue('Rickc$137');
      console.log('Entered password.');
  
      // Step 3: Click on Sign In button
      const signInButton = await $('//android.view.ViewGroup[@content-desc="Sign In"]');
      await signInButton.waitForDisplayed({ timeout: 60000 });
      await signInButton.click();
      console.log('Clicked on Sign In button.');
  
      // Wait for the app to navigate to the next screen after login
      await driver.pause(5000); // Adjust the pause time as needed
    });
  
    it('should navigate through the app and create a package successfully', async () => {
      try {
        // Step 1: Click on the Menu button
        const menuButton = await $('//android.view.ViewGroup[@content-desc="Menu"]/android.view.ViewGroup');
        await menuButton.waitForDisplayed({ timeout: 60000 });
        await menuButton.click();
        console.log('Clicked on Menu button.');
  
        // Step 2: Click on the second ViewGroup element (instance 2)
        const secondViewGroup = await $('android=new UiSelector().className("android.view.ViewGroup").instance(2)');
        await secondViewGroup.waitForDisplayed({ timeout: 60000 });
        await secondViewGroup.click();
        console.log('Clicked on second ViewGroup.');
  
        // Step 3: Click on the 39th ViewGroup element (instance 39)
        const thirtyNinthViewGroup = await $('android=new UiSelector().className("android.view.ViewGroup").instance(39)');
        await thirtyNinthViewGroup.waitForDisplayed({ timeout: 60000 });
        await thirtyNinthViewGroup.click();
        console.log('Clicked on 39th ViewGroup.');
  
        // Step 4: Click on the 4th ImageView element (instance 3)
        const fourthImageView = await $('android=new UiSelector().className("android.widget.ImageView").instance(3)');
        await fourthImageView.waitForDisplayed({ timeout: 60000 });
        await fourthImageView.click();
        console.log('Clicked on 4th ImageView.');
  
        // Step 5: Click on the 39th ViewGroup element again (instance 39)
        await thirtyNinthViewGroup.waitForDisplayed({ timeout: 60000 });
        await thirtyNinthViewGroup.click();
        console.log('Clicked on 39th ViewGroup again.');
  
        // Step 6: Click on the 39th ViewGroup element once more (instance 39)
        await thirtyNinthViewGroup.waitForDisplayed({ timeout: 60000 });
        await thirtyNinthViewGroup.click();
        console.log('Clicked on 39th ViewGroup once more.');
  
        // Step 7: Click on the "Create Package" button using accessibility ID
        const createPackageButton = await $('~Create Package');
        await createPackageButton.waitForDisplayed({ timeout: 60000 });
        await createPackageButton.click();
        console.log('Clicked on Create Package button.');
  
        // Step 8: Verify successful navigation to the Create Package screen
        const createPackageScreen = await $('//android.widget.TextView[@text="Create Package Screen"]');
        await createPackageScreen.waitForDisplayed({ timeout: 60000 });
        console.log('Create Package screen is displayed.');
      } catch (error) {
        console.error('Test failed due to an error:', error.message);
        const screenshot = await driver.takeScreenshot();
        console.log('Screenshot taken:', screenshot);
        throw error;
      }
    });
  });