import { expect } from 'chai';
import { faker } from '@faker-js/faker';

// 🛠️ Reusable helper to wait for an element and click
async function waitAndClick(selector, timeout = 10000) {
  let element;

  if (selector.startsWith('~')) {
    // accessibility id shorthand
    element = await $(`accessibility id:${selector.slice(1)}`);
  } else if (selector.startsWith('accessibility id:')) {
    element = await $(selector);
  } else if (selector.startsWith('-android uiautomator:')) {
    element = await $(selector);
  } else if (selector.startsWith('//')) {
    element = await $(selector); // XPath
  } else if (selector.startsWith('class name:')) {
    element = await $(selector); // class name
  } else {
    element = await $(selector); // fallback
  }

  await element.waitForDisplayed({ timeout });
  await element.click();
}

async function restartUiAutomator2Server() {
  console.log('Restarting UiAutomator2 server...');
  await driver.deleteSession();
  await driver.startSession();
  console.log('UiAutomator2 server restarted.');
}

describe('Signup Flow', () => {
  before(async () => {
    try {
      await driver.startActivity(
        'com.willma.staging',
        'com.willma.staging.MainActivity'
      );
      console.log('App launched successfully.');
    } catch (error) {
      console.error('Error launching the app:', error);
      await restartUiAutomator2Server();
    }
  });

  it('makeform', async () => {
    await $('android=new UiSelector().resourceId("email-input")').setValue('amr@test.test');
    await $('android=new UiSelector().resourceId("password-input")').setValue('Abc@1234');
    await $('android=new UiSelector().resourceId("login-button")').click();

    await waitAndClick('~menu-tab');
    await waitAndClick('-android uiautomator:new UiSelector().text("Form Center")');
    await waitAndClick('~New Form');

    await $('-android uiautomator:new UiSelector().text("Form Name....")')
      .setValue('packegeAmrForm AUto');
      await driver.hideKeyboard(); // Optional, to avoid overlapping UI

    await $('-android uiautomator:new UiSelector().text("Enter Form Description")')
      .setValue('this is mydescription ofPAck');
    await waitAndClick('-android uiautomator:new UiSelector().text("Add A Question")');

    const questionTextInput = await $('//android.widget.EditText[@text="Enter question text"]');
    await questionTextInput.waitForDisplayed({ timeout: 5000 });
    await questionTextInput.setValue('Automated Question');
await driver.hideKeyboard(); // Optional, to avoid overlapping UI

    const chooseTypeElement = await $('-android uiautomator:new UiSelector().description("Choose type")');
    await chooseTypeElement.scrollIntoView();
    await chooseTypeElement.click();

    const numericElement = await $('~Numeric');
    await numericElement.waitForDisplayed({ timeout: 5000 });
    await numericElement.click();

const saveFormButton = await $('android=new UiSelector().description("Save Form")');
    await saveFormButton.waitForDisplayed({ timeout: 5000 });
    await saveFormButton.click();
    console.log('✅ Clicked on "Save Form".');
await driver.hideKeyboard(); // Optional, to avoid overlapping UI

    // await driver.refresh();
    const el1 = await $('-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(0)');
    await el1.click();
  });

  it('assign form to client', async () => {
    const svgViewElement = await $('-android uiautomator:new UiSelector().className("com.horcrux.svg.SvgView").instance(3)');
    await svgViewElement.waitForDisplayed({ timeout: 5000 });
    await svgViewElement.click();

    await waitAndClick('~Send To Client');

    const editText = await $('android.widget.EditText');
    await editText.waitForDisplayed({ timeout: 5000 });
    expect(await editText.isDisplayed()).to.be.true;

    await waitAndClick('~Select All');
    await waitAndClick('~Select a package');
    await waitAndClick('-android uiautomator:new UiSelector().text("Send to client")');
await waitAndClick('-android uiautomator:new UiSelector().className("com.horcrux.svg.SvgView").instance(0)',2000);
await driver.back();

await waitAndClick('~logout-button', 20000);
    await waitAndClick('~logout-confirmation-yes-button', 20000);

  });

  it('search for form', async () => {
    
    // Optional: add text input here later
  });

  it('edit form and logout', async () => {
  

    console.log('✅ Clicked on "Save Form".');

   

    // 🔁 Updated logout steps:
    
  });
});
