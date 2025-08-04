import { expect } from 'chai';
import { remote } from 'webdriverio';
import { faker } from '@faker-js/faker';

const waitAndRetry = async (fn, retries = 1, waitMs = 1000) => {
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

// Utility: Wait for element to be displayed, then click
const waitForDisplayedAndClick = async (el, timeout = 10000) => {
  await el.waitForDisplayed({ timeout });
  await el.click();
};

// Utility: click an element if it exists & is displayed, otherwise no‑op
const clickIfExists = async (selector, options = {}) => {
  const { timeout = 3000, using = 'accessibility id' } = options;
  try {
    const el = await driver.$(`${using}:${selector}`);
    if (await el.waitForDisplayed({ timeout, interval: 500 })) {
      await el.click();
      return true;
    }
  } catch {
    // ignore if not found or not displayed
  }
  return false;
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
      await waitForDisplayedAndClick(el1);

      const el2 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().resourceId("username-input")'));
      await waitForDisplayedAndClick(el2);
      await waitAndRetry(() => el2.addValue(username));

      const el3 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(13)'));
      await waitForDisplayedAndClick(el3);

      const el4 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().resourceId("password-input")'));
      await waitAndRetry(() => el4.addValue("Abc@1234"));

      const el5 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().resourceId("email-input")'));
      await waitAndRetry(() => el5.addValue(email));

      const el6 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().text("I agree to the ")'));
      await waitForDisplayedAndClick(el6);

      const el7 = await waitAndRetry(() => driver.$('accessibility id:Sign Up'));
      await waitForDisplayedAndClick(el7);

      const el8 = await waitAndRetry(() => driver.$('id:android:id/button1'));
      await waitForDisplayedAndClick(el8);

      const el9 = await waitAndRetry(() => driver.$('accessibility id:Terms and Conditions.'));
      await waitForDisplayedAndClick(el9);

      // Scrolls
      await waitAndRetry(() =>
        driver.action('pointer')
          .move({ duration: 0, x: 545, y: 1634 }).down({ button: 0 })
          .move({ duration: 1000, x: 567, y: 478 }).up({ button: 0 })
          .perform()
      );
      await waitAndRetry(() =>
        driver.action('pointer')
          .move({ duration: 0, x: 515, y: 1597 }).down({ button: 0 })
          .move({ duration: 1000, x: 534, y: 459 }).up({ button: 0 })
          .perform()
      );
      await waitAndRetry(() =>
        driver.action('pointer')
          .move({ duration: 0, x: 396, y: 1914 }).down({ button: 0 })
          .move({ duration: 1000, x: 403, y: 537 }).up({ button: 0 })
          .perform()
      );

      const el10 = await waitAndRetry(() => driver.$('class name:com.horcrux.svg.SvgView'));
      await waitForDisplayedAndClick(el10);

      await waitAndRetry(() =>
        driver.action('pointer')
          .move({ duration: 0, x: 67, y: 1414 }).down({ button: 0 })
          .pause(50).up({ button: 0 })
          .perform()
      );

      const signupp = await waitAndRetry(() => driver.$('accessibility id:Sign Up'));
      await waitForDisplayedAndClick(signupp);

      const otp = await waitAndRetry(() => driver.$('class name:android.widget.EditText'));
      await waitAndRetry(() => otp.addValue("111111"));

      const Verifyotp = await waitAndRetry(() => driver.$('accessibility id:Verify'));
      await waitForDisplayedAndClick(Verifyotp);

      const start = await waitAndRetry(() => driver.$('accessibility id:Awesome, let’s start!'));
      await waitForDisplayedAndClick(start);

      const first = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().resourceId("first-name-input")'));
      await waitAndRetry(() => first.addValue(firstName));

      const lastname = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().resourceId("last-name-input")'));
      await waitAndRetry(() => lastname.addValue(lastName));

      const next = await waitAndRetry(() => driver.$('accessibility id:Next'));
      await waitForDisplayedAndClick(next);

      driver.pause(2000); // ensure next screen loads properly
      // handle optional skip if present
      await clickIfExists('Skip', { timeout: 2000 });

      const el11 = await waitAndRetry(() => driver.$('accessibility id:Male'));
      await waitForDisplayedAndClick(el11);

      const el12 = await waitAndRetry(() => driver.$('accessibility id:Next'));
      await waitForDisplayedAndClick(el12);
      const el13 = await waitAndRetry(() => driver.$('accessibility id:Next'));
      await waitForDisplayedAndClick(el13);
      const el14 = await waitAndRetry(() => driver.$('accessibility id:Next'));
      await waitForDisplayedAndClick(el14);
      const el15 = await waitAndRetry(() => driver.$('accessibility id:Next'));
      await waitForDisplayedAndClick(el15);

      const el16 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().text("Lose Weight")'));
      await waitForDisplayedAndClick(el16);

      const el17 = await waitAndRetry(() => driver.$('accessibility id:Next'));
      await waitForDisplayedAndClick(el17);

      const el18 = await waitAndRetry(() => driver.$('accessibility id:No'));
      await waitForDisplayedAndClick(el18);

      const el19 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().resourceId("step8-button-label")'));
      await waitForDisplayedAndClick(el19);

      const el20 = await waitAndRetry(() => driver.$('accessibility id:Next'));
      await waitForDisplayedAndClick(el20);

      const el21 = await waitAndRetry(() => driver.$('accessibility id:No'));
      await waitForDisplayedAndClick(el21);

      const el22 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().resourceId("step9-button-label")'));
      await waitForDisplayedAndClick(el22);

      const el23 = await waitAndRetry(() => driver.$('accessibility id:No'));
      await waitForDisplayedAndClick(el23);

      const el24 = await waitAndRetry(() => driver.$('accessibility id:Next'));
      await waitForDisplayedAndClick(el24);

      const el25 = await waitAndRetry(() => driver.$('accessibility id:Start exploring'));
      await waitForDisplayedAndClick(el25);

      const el26 = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().text("Skip")'));
      await waitForDisplayedAndClick(el26);

      console.log('Signup flow completed successfully with user:', { username, email, firstName, lastName });

      const consultantsTab = await waitAndRetry(() => driver.$('accessibility id:Consultants'));
      await waitForDisplayedAndClick(consultantsTab);

      await waitAndRetry(() =>
        driver.action('pointer')
          .move({ duration: 0, x: 1004, y: 582 }).down({ button: 0 })
          .move({ duration: 1000, x: 358, y: 586 }).up({ button: 0 })
          .perform()
      );

      await waitForDisplayedAndClick(consultantsTab);

      const consultantsTextOption = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().text("Consultants")'));
      await waitForDisplayedAndClick(consultantsTextOption);

      const searchInput = await waitAndRetry(() => driver.$('class name:android.widget.EditText'));
      await waitAndRetry(() => searchInput.addValue("traineramr"));

      const selectConsultant = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().text("trainerAmr")'));
      await waitForDisplayedAndClick(selectConsultant);

      await driver.pause(2000);

      const packagesButton = await waitAndRetry(() => driver.$('accessibility id:Packages'));
      await waitForDisplayedAndClick(packagesButton);

      await waitAndRetry(() =>
        driver.action('pointer')
          .move({ duration: 0, x: 765, y: 1302 }).down({ button: 0 })
          .move({ duration: 1000, x: 754, y: 896 }).up({ button: 0 })
          .perform()
      );

      const selectPackage = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().text("تتت")'));
      await waitForDisplayedAndClick(selectPackage);

      const subscribeNowBtn = await waitAndRetry(() => driver.$('accessibility id:Subscribe Now'));
      await waitForDisplayedAndClick(subscribeNowBtn);

      const confirmPhonePopupBtn = await waitAndRetry(() => driver.$('id:android:id/button1'));
      await waitForDisplayedAndClick(confirmPhonePopupBtn);

      const phoneInput = await waitAndRetry(() => driver.$('class name:android.widget.EditText'));
      const randomPhone = Math.floor(10000000000 + Math.random() * 90000000000).toString();
      await waitAndRetry(() => phoneInput.addValue(randomPhone));

      const changePhoneBtn = await waitAndRetry(() => driver.$('accessibility id:Change My Phone Number'));
      await waitForDisplayedAndClick(changePhoneBtn);
      await waitForDisplayedAndClick(selectPackage);
      await waitForDisplayedAndClick(subscribeNowBtn);

      const promoCodeInput = await waitAndRetry(() => driver.$('class name:android.widget.EditText'));
      await waitAndRetry(() => promoCodeInput.addValue("PR10"));

      const applyPromoBtn = await waitAndRetry(() =>
        driver.$('-android uiautomator:new UiSelector().text("Apply")')
      );
      await waitForDisplayedAndClick(applyPromoBtn);

      const totalElement = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().text("Total")'));
      for (let i = 0; i < 7; i++) {
        await waitForDisplayedAndClick(totalElement);
      }

      const goToFormSubmissionBtn = await waitAndRetry(() => driver.$('accessibility id:Go To Form Submission'));
      await waitForDisplayedAndClick(goToFormSubmissionBtn);

      const formQuestion = await waitAndRetry(() => driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(27)'));
      await waitForDisplayedAndClick(formQuestion);

      const submitFormBtn = await waitAndRetry(() => driver.$('accessibility id:Submit Form'));
      await waitForDisplayedAndClick(submitFormBtn);
      driver.pause(5000);

      const menuBtn = await waitAndRetry(() => driver.$('accessibility id:Menu'));
      await waitForDisplayedAndClick(menuBtn);

      const logoutBtn = await waitAndRetry(() => driver.$('accessibility id:Logout'));
      await waitForDisplayedAndClick(logoutBtn);

      const confirmYesBtn = await waitAndRetry(() => driver.$('accessibility id:Yes'));
      await waitForDisplayedAndClick(confirmYesBtn);

    } catch (error) {
      console.error('Signup flow failed:', error.message);
      const screenshot = await driver.takeScreenshot();
      console.log('Screenshot taken:', screenshot);
      throw error;
    }
  });
});
