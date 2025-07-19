import { expect } from 'chai';
import { remote } from 'webdriverio';
import { faker } from '@faker-js/faker';

const waitAndRetry = async (fn, retries = 3, waitMs = 1000) => {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < retries - 1) await new Promise(res => setTimeout(res, waitMs));
    }
  }
  throw lastErr;
};

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
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();

      const el1 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().resourceId("signup-button")'));
      await waitAndRetry(() => el1.click());

      const el2 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().resourceId("username-input")'));
      await waitAndRetry(() => el2.click());
      await waitAndRetry(() => el2.addValue(username));

      const el3 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(13)'));
      await waitAndRetry(() => el3.click());
      await waitAndRetry(() => el3.click());

      const el4 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().resourceId("password-input")'));
      await waitAndRetry(() => el4.addValue("Abc@1234"));

      const el5 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().resourceId("email-input")'));
      await waitAndRetry(() => el5.addValue(email));

      const el6 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().text("I agree to the ")'));
      await waitAndRetry(() => el6.click());

      const el7 = await waitAndRetry(() => driver.$('accessibility id:Sign Up'));
      await waitAndRetry(() => el7.click());

      const el8 = await waitAndRetry(() => driver.$('id:android:id/button1'));
      await waitAndRetry(() => el8.click());

      const el9 = await waitAndRetry(() => driver.$('accessibility id:Terms and Conditions.'));
      await waitAndRetry(() => el9.click());

      // Scrolls
      await waitAndRetry(() => driver.action('pointer').move({ duration: 0, x: 545, y: 1634 }).down({ button: 0 }).move({ duration: 1000, x: 567, y: 478 }).up({ button: 0 }).perform());
      await waitAndRetry(() => driver.action('pointer').move({ duration: 0, x: 515, y: 1597 }).down({ button: 0 }).move({ duration: 1000, x: 534, y: 459 }).up({ button: 0 }).perform());
      await waitAndRetry(() => driver.action('pointer').move({ duration: 0, x: 396, y: 1914 }).down({ button: 0 }).move({ duration: 1000, x: 403, y: 537 }).up({ button: 0 }).perform());

      const el10 = await waitAndRetry(() => driver.$('class name:com.horcrux.svg.SvgView'));
      await waitAndRetry(() => el10.click());

      await waitAndRetry(() => driver.action('pointer').move({ duration: 0, x: 67, y: 1414 }).down({ button: 0 }).pause(50).up({ button: 0 }).perform());

      const signupp = await waitAndRetry(() => driver.$("accessibility id:Sign Up"));
      await waitAndRetry(() => signupp.click());

      const otp = await waitAndRetry(() => driver.$("class name:android.widget.EditText"));
      await waitAndRetry(() => otp.addValue("111111"));

      const Verifyotp = await waitAndRetry(() => driver.$("accessibility id:Verify"));
      await waitAndRetry(() => Verifyotp.click());

      const start = await waitAndRetry(() => driver.$("accessibility id:Awesome, let’s start!"));
      await waitAndRetry(() => start.click());

      const first = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().resourceId("first-name-input")'));
      await waitAndRetry(() => first.addValue(firstName));

      const lastname = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().resourceId("last-name-input")'));
      await waitAndRetry(() => lastname.addValue(lastName));

      const next = await waitAndRetry(() => driver.$("accessibility id:Next"));
      await waitAndRetry(() => next.click());

      const Skip = await waitAndRetry(() => driver.$("accessibility id:Skip"));
      await waitAndRetry(() => Skip.click());

      const el11 = await waitAndRetry(() => driver.$("accessibility id:Male"));
      await waitAndRetry(() => el11.click());

      const el12 = await waitAndRetry(() => driver.$("accessibility id:Next"));
      await waitAndRetry(() => el12.click());
      const el13 = await waitAndRetry(() => driver.$("accessibility id:Next"));
      await waitAndRetry(() => el13.click());
      const el14 = await waitAndRetry(() => driver.$("accessibility id:Next"));
      await waitAndRetry(() => el14.click());
      const el15 = await waitAndRetry(() => driver.$("accessibility id:Next"));
      await waitAndRetry(() => el15.click());

      const el16 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().text("Lose Weight")'));
      await waitAndRetry(() => el16.click());

      const el17 = await waitAndRetry(() => driver.$("accessibility id:Next"));
      await waitAndRetry(() => el17.click());

      const el18 = await waitAndRetry(() => driver.$("accessibility id:No"));
      await waitAndRetry(() => el18.click());

      const el19 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().resourceId("step8-button-label")'));
      await waitAndRetry(() => el19.click());

      const el20 = await waitAndRetry(() => driver.$("accessibility id:Next"));
      await waitAndRetry(() => el20.click());

      const el21 = await waitAndRetry(() => driver.$("accessibility id:No"));
      await waitAndRetry(() => el21.click());

      const el22 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().resourceId("step9-button-label")'));
      await waitAndRetry(() => el22.click());

      const el23 = await waitAndRetry(() => driver.$("accessibility id:No"));
      await waitAndRetry(() => el23.click());

      const el24 = await waitAndRetry(() => driver.$("accessibility id:Next"));
      await waitAndRetry(() => el24.click());

      const el25 = await waitAndRetry(() => driver.$("accessibility id:Start exploring"));
      await waitAndRetry(() => el25.click());

      const el26 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().text("Skip")'));
      await waitAndRetry(() => el26.click());

      console.log('Signup flow completed successfully with user:', { username, email, firstName, lastName });

      const consultantsTab = await waitAndRetry(() => driver.$("accessibility id:Consultants"));
      await waitAndRetry(() => consultantsTab.click());

      await waitAndRetry(() =>
        driver.action('pointer')
          .move({ duration: 0, x: 1004, y: 582 })
          .down({ button: 0 })
          .move({ duration: 1000, x: 358, y: 586 })
          .up({ button: 0 })
          .perform()
      );

      await waitAndRetry(() => consultantsTab.click());

      const consultantsTextOption = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().text("Consultants")'));
      await waitAndRetry(() => consultantsTextOption.click());

      const searchInput = await waitAndRetry(() => driver.$("class name:android.widget.EditText"));
      await waitAndRetry(() => searchInput.addValue("traineramr"));

      const selectConsultant = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().text("trainerAmr")'));
      await waitAndRetry(() => selectConsultant.click());

      const packagesButton = await waitAndRetry(() => driver.$("accessibility id:Packages"));
      await waitAndRetry(() => packagesButton.click());

      await waitAndRetry(() =>
        driver.action('pointer')
          .move({ duration: 0, x: 765, y: 1302 })
          .down({ button: 0 })
          .move({ duration: 1000, x: 754, y: 896 })
          .up({ button: 0 })
          .perform()
      );

      const selectPackage = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().text("تتت")'));
      await waitAndRetry(() => selectPackage.click());

      const subscribeNowBtn = await waitAndRetry(() => driver.$("accessibility id:Subscribe Now"));
      await waitAndRetry(() => subscribeNowBtn.click());

      const confirmPhonePopupBtn = await waitAndRetry(() => driver.$("id:android:id/button1"));
      await waitAndRetry(() => confirmPhonePopupBtn.click());

      const phoneInput = await waitAndRetry(() => driver.$("class name:android.widget.EditText"));
      await waitAndRetry(() => phoneInput.addValue("045684621325644"));

      const changePhoneBtn = await waitAndRetry(() => driver.$("accessibility id:Change My Phone Number"));
      await waitAndRetry(() => changePhoneBtn.click());

      const backIcon = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(0)'));
      await waitAndRetry(() => backIcon.click());

      // const retryPackage = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(40)'));
      // await waitAndRetry(() => retryPackage.click());

      const retrySubscribeNow = await waitAndRetry(() => driver.$("accessibility id:Subscribe Now"));
      await waitAndRetry(() => retrySubscribeNow.click());

      const promoCodeInput = await waitAndRetry(() => driver.$("class name:android.widget.EditText"));
      await waitAndRetry(() => promoCodeInput.addValue("PR10"));

      const applyPromoBtn = await waitAndRetry(() => driver.$("accessibility id:Apply Promo Code"));
      await waitAndRetry(() => applyPromoBtn.click());

      const totalElement = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().text("Total")'));
      for (let i = 0; i < 9; i++) {
        await waitAndRetry(() => totalElement.click());
      }

      const goToFormSubmissionBtn = await waitAndRetry(() => driver.$("accessibility id:Go To Form Submission"));
      await waitAndRetry(() => goToFormSubmissionBtn.click());

      const formQuestion = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(27)'));
      await waitAndRetry(() => formQuestion.click());

      const submitFormBtn = await waitAndRetry(() => driver.$("accessibility id:Submit Form"));
      await waitAndRetry(() => submitFormBtn.click());

    } catch (error) {
      console.error('Signup flow failed:', error.message);
      const screenshot = await driver.takeScreenshot();
      console.log('Screenshot taken:', screenshot);
      throw error;
    }
  });
});