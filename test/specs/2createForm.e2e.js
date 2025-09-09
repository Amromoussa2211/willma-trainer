import { expect } from 'chai';
import { faker } from '@faker-js/faker';

// 🔍 Universal element finder
async function findElement(selector) {
  if (selector.startsWith('~')) {
    return await $(`accessibility id:${selector.slice(1)}`);
  }
  return await $(selector);
}

// 🛠️ Wait and click helper
async function waitAndClick(selector, timeout = 10000) {
  const el = await findElement(selector);
  await el.waitForDisplayed({ timeout });
  await el.click();
  return el;
}

// ⏳ Simple wait
async function wait(ms = 1000) {
  await driver.pause(ms);
}

// 📱 Gestures
async function swipe(startX, startY, endX, endY, duration = 1000) {
  await driver
    .action('pointer')
    .move({ duration: 0, x: startX, y: startY })
    .down({ button: 0 })
    .move({ duration, x: endX, y: endY })
    .up({ button: 0 })
    .perform();
  await wait(800); // allow UI to settle
}

async function tapAt(x, y) {
  await driver
    .action('pointer')
    .move({ duration: 0, x, y })
    .down({ button: 0 })
    .pause(50)
    .up({ button: 0 })
    .perform();
  await wait(500); // small buffer after tap
}

// 🔄 Restart UiAutomator2 if needed
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

  it('should create, copy,search ,and delete a form', async () => {
    // 🔑 Login
    await $(
      'android=new UiSelector().resourceId("email-input")'
    ).setValue('amr@test.test');
    await $(
      'android=new UiSelector().resourceId("password-input")'
    ).setValue('Abc@1234');
    await waitAndClick(
      'android=new UiSelector().resourceId("login-button")'
    );

    // Wait for home screen
    await wait(2000);

    // 📂 Navigate to Form Center
    await waitAndClick('~menu-tab');
    await waitAndClick(
      '-android uiautomator:new UiSelector().text("Form Center")'
    );
    await wait(2000);
  });
it('view inithial form', async () => {
    // 📝 Start new form creation
    await waitAndClick(
      '-android uiautomator:new UiSelector().className("com.horcrux.svg.SvgView").instance(3)'
    );
    await waitAndClick('~view-template-button');
    await wait(2000);

    // 📲 Perform drag/drop gestures
    await swipe(476, 623, 499, 2052);
    await swipe(591, 1598, 573, 2089);
    await swipe(829, 1603, 802, 2217);
    await swipe(664, 485, 673, 2217);
    await swipe(650, 678, 641, 2235);
    await swipe(568, 820, 614, 2226);
    await swipe(614, 2226, 614, 641);
    await swipe(701, 2061, 710, 344);
    await swipe(742, 1791, 728, 275);
    await swipe(802, 2162, 811, 440);

    // ✅ Assign template
    await waitAndClick(
      '-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(0)'
    );
    await waitAndClick(
      '-android uiautomator:new UiSelector().className("com.horcrux.svg.SvgView").instance(5)'
    );
    await waitAndClick('~assign-template-button');
    await waitAndClick(
      '-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(28)'
    );
    await waitAndClick('~assign-package-button');
    await wait(1500);

    // 📚 Open My Forms
    await waitAndClick(
      '-android uiautomator:new UiSelector().text("My Forms")'
    );
    await waitAndClick(
      '-android uiautomator:new UiSelector().text("By Willma")'
    );
    await waitAndClick('-android uiautomator:new UiSelector().text("All")');
    await wait(1500);
      });

it('make copy', async () => {
    // 📑 Copy template
   await waitAndClick(
  '-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(3)'
);
await waitAndClick('~copy-template-button');

// 🔄 Wait for input to appear
const formTitleInput = await $('~form-title-input');
await formTitleInput.waitForDisplayed({ timeout: 15000 });

// Focus, clear, and type
await formTitleInput.click();
await formTitleInput.clearValue();
const fakeTitle = `autoin${faker.datatype.number({ min: 10, max: 99 })}`;
await formTitleInput.addValue(fakeTitle);

// Save
await waitAndClick('~save-duplicate-button');
await driver.pause(2000);
    // 🔄 Perform some scrolls & taps
    await swipe(540, 2153, 540, 472);
    await swipe(646, 733, 627, 2203);
    await swipe(605, 605, 623, 2139);
    
await driver.pause(2000);
  });

it('search for copyform', async () => {
  const el2 = await driver.$("accessibility id:search-input");
await el2.click();
await el2.addValue("auto");
await waitAndClick('~form-0-button');
    // ❌ Delete form
    await waitAndClick(
      '-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(3)'
    );
    await waitAndClick('~delete-form-button');
    await waitAndClick('~Delete');

    // Wait for list refresh
    await wait(2000);

    // 🧾 Validation
    const myFormsTab = await $(
      '-android uiautomator:new UiSelector().text("My Forms")'
    );
    await myFormsTab.waitForDisplayed({ timeout: 5000 });
    expect(await myFormsTab.isDisplayed()).to.be.true;
      });
it('assign form to client', async () => {
  const el1 = await driver.$("-android uiautomator:new UiSelector().text(\"By Willma\")");
await el1.click();
const el2 = await driver.$("-android uiautomator:new UiSelector().text(\"All\")");
await el2.click();
const el3 = await driver.$("accessibility id:search-input");
await el3.click();
await el3.addValue(" ");
const el4 = await driver.$("-android uiautomator:new UiSelector().text(\"By Willma\")");
await el4.click();
const el5 = await driver.$("-android uiautomator:new UiSelector().className(\"com.horcrux.svg.PathView\").instance(9)");
await el5.click();
const el6 = await driver.$("accessibility id:send-template-button");
await el6.click();
const el7 = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(2)");
await el7.click();
const el8 = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(27)");
await el8.click();
await el8.click();
const el9 = await driver.$("-android uiautomator:new UiSelector().className(\"com.horcrux.svg.PathView\").instance(0)");
await el9.click();
const el10 = await driver.$("-android uiautomator:new UiSelector().className(\"com.horcrux.svg.SvgView\").instance(0)");
await el10.click();
const el11 = await driver.$("accessibility id:logout-button");
await el11.click();
const el12 = await driver.$("accessibility id:logout-confirmation-yes-button");
await el12.click();

  });
});
