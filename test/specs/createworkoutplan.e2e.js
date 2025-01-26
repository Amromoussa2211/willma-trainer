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

    const passwordInput = await $('//android.widget.EditText[@resource-id="password-input"]');
    await passwordInput.setValue('P@$$w0rd2010');
    console.log('Entered password.');

    const signInButton = await $('//android.view.ViewGroup[@content-desc="Sign In"]');
    await signInButton.click();
    console.log('Clicked on Sign In button.');
  });

  it('should create a complete workout plan with exercises and scheduling', async () => {
    try {
      // Navigation to plan creation
      const svgPath = await $('android=new UiSelector().className("com.horcrux.svg.PathView").instance(5)');
      await svgPath.click();
      console.log('Clicked main menu icon');

      const profileButton = await $('~Amrmoussa');
      await profileButton.click();
      console.log('Accessed profile section');

      const plansTab = await $('~Plans');
      await plansTab.click();
      console.log('Navigated to Plans section');

      // Plan creation flow
      const newPlanButton = await $('~Design New Plan');
      await newPlanButton.click();
      console.log('Started new plan creation');

      // Updated sequence using UiAutomator selectors
      const selectactiveplane = await $('android=new UiSelector().className("android.view.ViewGroup").instance(26)');
      await selectactiveplane.waitForDisplayed({ timeout: 10000 });
      await selectactiveplane.click();
      console.log('Clicked selectactiveplane');

      const el2 = await $('android=new UiSelector().text("Enter plan name")');
      await el2.click();
      await el2.setValue('automationplan');
      console.log('Entered plan name');

      const el3 = await $('android=new UiSelector().text("Workout")');
      await el3.click();
      await el3.click(); // Double click if needed
      console.log('Selected workout type twice');

      const el5 = await $('~Next');
      await el5.click();
      console.log('Clicked Next button');
///////////////////////////////////////////////////////////////////////////////////

// Your added sequence
const el1 = await $('android=new UiSelector().className("android.widget.Switch").instance(0)');
await el1.click();

// const el2_dup = await $('android=new UiSelector().className("android.widget.Switch").instance(0)');
// await el2_dup.click();

const el3_new = await $('android=new UiSelector().className("android.widget.Switch").instance(1)');
await el3_new.click();

const el4 = await $('android=new UiSelector().description("Day 3").instance(0)');
await el4.click();

const el5_new = await $('android.widget.Switch');
await el5_new.click();

const el6 = await $('~Day 4');
await el6.click();

const el7 = await $('android.widget.Switch');
await el7.click();

const el8 = await $('~Day 5');
await el8.click();

const el9 = await $('android.widget.Switch');
await el9.click();

const el10 = await $('android=new UiSelector().text("Day 6")');
await el10.click();

const el11 = await $('android.widget.Switch');
await el11.click();

// const el12 = await $('android=new UiSelector().className("android.view.ViewGroup").instance(42)');
// await el12.click();

const el13 = await $('android=new UiSelector().text("Day 7")');
await el13.click();

const el14 = await $('android.widget.Switch');
await el14.click();

// Final steps
// Next button
const el15 = await $('~Next');
await el15.click();
console.log('Clicked Next button');
 const nextfourms = await $('~Next'); 
  await nextfourms.click(); 
  console.log('Clicked Next fourmbutton');

  const seceduleAndfinsh = await $('//android.view.ViewGroup[@content-desc="Schedule & Finish"]');
    await seceduleAndfinsh.click();

 
} catch (error) {
console.error('Test failed:', error);
throw error;
}
});
});