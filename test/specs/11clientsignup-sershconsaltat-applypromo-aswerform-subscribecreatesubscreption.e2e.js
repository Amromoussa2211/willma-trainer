import { expect } from 'chai';
import { remote } from 'webdriverio';
import { faker } from '@faker-js/faker';

describe('App Launch and Login Flow', () => {
  before(async () => {
    await driver.startActivity(
      'com.willma.client.staging',
      'com.willma.client.staging.MainActivity'
    );
    console.log('App launched successfully.');
    console.log('Current activity:', await driver.getCurrentActivity());
  });

  it('should perform the sign up flow successfully', async () => {
    try {
      // Generate dynamic user data
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();

      const el1 = await driver.$('-android uiautomator:new UiSelector().resourceId("signup-button")');
      await el1.click();

      const el2 = await driver.$('-android uiautomator:new UiSelector().resourceId("username-input")');
      await el2.click();
      await el2.addValue(username);

      const el3 = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(13)');
      await el3.click();
      await el3.click();

      const el4 = await driver.$('-android uiautomator:new UiSelector().resourceId("password-input")');
      await el4.addValue("Abc@1234");

      const el5 = await driver.$('-android uiautomator:new UiSelector().resourceId("email-input")');
      await el5.addValue(email);

      const el6 = await driver.$('-android uiautomator:new UiSelector().text("I agree to the ")');
      await el6.click();

      const el7 = await driver.$('accessibility id:Sign Up');
      await el7.click();

      const el8 = await driver.$('id:android:id/button1');
      await el8.click();

      const el9 = await driver.$('accessibility id:Terms and Conditions.');
      await el9.click();

      // Scrolls
      await driver.action('pointer').move({ duration: 0, x: 545, y: 1634 }).down({ button: 0 }).move({ duration: 1000, x: 567, y: 478 }).up({ button: 0 }).perform();
      await driver.action('pointer').move({ duration: 0, x: 515, y: 1597 }).down({ button: 0 }).move({ duration: 1000, x: 534, y: 459 }).up({ button: 0 }).perform();
      await driver.action('pointer').move({ duration: 0, x: 396, y: 1914 }).down({ button: 0 }).move({ duration: 1000, x: 403, y: 537 }).up({ button: 0 }).perform();

      const el10 = await driver.$('class name:com.horcrux.svg.SvgView');
      await el10.click();

      await driver.action('pointer').move({ duration: 0, x: 67, y: 1414 }).down({ button: 0 }).pause(50).up({ button: 0 }).perform();

      const signupp = await driver.$("accessibility id:Sign Up");
      await signupp.click();

      const otp = await driver.$("class name:android.widget.EditText");
      await otp.addValue("111111");

      const Verifyotp = await driver.$("accessibility id:Verify");
      await Verifyotp.click();

      const start = await driver.$("accessibility id:Awesome, let’s start!");
      await start.click();

      const first = await driver.$('-android uiautomator:new UiSelector().resourceId("first-name-input")');
      await first.addValue(firstName);

      const lastname = await driver.$('-android uiautomator:new UiSelector().resourceId("last-name-input")');
      await lastname.addValue(lastName);

      const next = await driver.$("accessibility id:Next");
      await next.click();

      const Skip = await driver.$("accessibility id:Skip");
      await Skip.click();

      const el11 = await driver.$("accessibility id:Male");
      await el11.click();

      const el12 = await driver.$("accessibility id:Next");
      await el12.click();
      const el13 = await driver.$("accessibility id:Next");
      await el13.click();
      const el14 = await driver.$("accessibility id:Next");
      await el14.click();
      const el15 = await driver.$("accessibility id:Next");
      await el15.click();

      const el16 = await driver.$('-android uiautomator:new UiSelector().text("Lose Weight")');
      await el16.click();

      const el17 = await driver.$("accessibility id:Next");
      await el17.click();

      const el18 = await driver.$("accessibility id:No");
      await el18.click();

      const el19 = await driver.$('-android uiautomator:new UiSelector().resourceId("step8-button-label")');
      await el19.click();

      const el20 = await driver.$("accessibility id:Next");
      await el20.click();

      const el21 = await driver.$("accessibility id:No");
      await el21.click();

      const el22 = await driver.$('-android uiautomator:new UiSelector().resourceId("step9-button-label")');
      await el22.click();

      const el23 = await driver.$("accessibility id:No");
      await el23.click();

      const el24 = await driver.$("accessibility id:Next");
      await el24.click();

      const el25 = await driver.$("accessibility id:Start exploring");
      await el25.click();

      const el26 = await driver.$('-android uiautomator:new UiSelector().text("Skip")');
      await el26.click();

      console.log('Signup flow completed successfully with user:', { username, email, firstName, lastName });
       const consultantsTab = await driver.$("accessibility id:Consultants");
    await consultantsTab.click();

    await driver.action('pointer')
      .move({ duration: 0, x: 1004, y: 582 })
      .down({ button: 0 })
      .move({ duration: 1000, x: 358, y: 586 })
      .up({ button: 0 })
      .perform();

    await consultantsTab.click();

    const consultantsTextOption = await driver.$("-android uiautomator:new UiSelector().text(\"Consultants\")");
    await consultantsTextOption.click();

    const searchInput = await driver.$("class name:android.widget.EditText");
    await searchInput.addValue("traineramr");

    const selectConsultant = await driver.$("-android uiautomator:new UiSelector().text(\"trainerAmr\")");
    await selectConsultant.click();

    const packagesButton = await driver.$("accessibility id:Packages");
    await packagesButton.click();

    await driver.action('pointer')
      .move({ duration: 0, x: 765, y: 1302 })
      .down({ button: 0 })
      .move({ duration: 1000, x: 754, y: 896 })
      .up({ button: 0 })
      .perform();

    const selectPackage = await driver.$("-android uiautomator:new UiSelector().text(\"تتت\")");
    await selectPackage.click();

    const subscribeNowBtn = await driver.$("accessibility id:Subscribe Now");
    await subscribeNowBtn.click();

    const confirmPhonePopupBtn = await driver.$("id:android:id/button1");
    await confirmPhonePopupBtn.click();

    const phoneInput = await driver.$("class name:android.widget.EditText");
    await phoneInput.addValue("045684621325644");

    const changePhoneBtn = await driver.$("accessibility id:Change My Phone Number");
    await changePhoneBtn.click();

    const backIcon = await driver.$("-android uiautomator:new UiSelector().className(\"com.horcrux.svg.PathView\").instance(0)");
    await backIcon.click();

    // const retryPackage = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(40)");
    // await retryPackage.click();

    const retrySubscribeNow = await driver.$("accessibility id:Subscribe Now");
    await retrySubscribeNow.click();

    const promoCodeInput = await driver.$("class name:android.widget.EditText");
    await promoCodeInput.addValue("auto");

    const applyPromoBtn = await driver.$("accessibility id:Apply Promo Code");
    await applyPromoBtn.click();

    const totalElement = await driver.$("-android uiautomator:new UiSelector().text(\"Total\")");
    for (let i = 0; i < 9; i++) {
      await totalElement.click();
    }

    const goToFormSubmissionBtn = await driver.$("accessibility id:Go To Form Submission");
    await goToFormSubmissionBtn.click();

    const formQuestion = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(27)");
    await formQuestion.click();

    const submitFormBtn = await driver.$("accessibility id:Submit Form");
    await submitFormBtn.click();
     } catch (error) {
      console.error('Signup flow failed:', error.message);
      const screenshot = await driver.takeScreenshot();
      console.log('Screenshot taken:', screenshot);
      throw error;
    }
  });
});

   
  