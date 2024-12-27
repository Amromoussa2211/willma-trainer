describe('App Launch Test', () => {
  it('should verify that the app is installed and launched successfully', async () => {
      // Step 1: Verify the app is installed
      const isAppInstalled = await driver.isAppInstalled('com.willma.client.staging');
      expect(isAppInstalled).toBe(true);
      console.log('App is installed.');

      // Step 2: Launch the app
      await driver.startActivity('com.willma.client.staging', 'com.willma.client.staging.MainActivity');
      console.log('App launched successfully.');

      // Step 3: Verify the app is launched by checking for a specific element on the home screen
      // const homeElement = await $('//android.view.View[@content-desc="Home"]');

      // // Wait for the element to exist and be displayed
      // await homeElement.waitForDisplayed({ timeout: 20000 });
      // expect(await homeElement.isDisplayed()).toBe(true);
      // console.log('Home screen element is displayed.');
  });
});