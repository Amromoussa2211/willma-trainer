import { expect } from 'chai';

async function clickWithRetry(element) {
    await element.waitForDisplayed({ timeout: 60000 });
    await element.click();
}

async function setValueWithRetry(element, value) {
    await element.waitForDisplayed({ timeout: 60000 });
    await element.setValue(value);
}

describe('Promo Code Creation Flow', () => {
    before(async () => {
        // Launch the app and wait for login screen
        await driver.startActivity('com.willma.staging', 'com.willma.staging.MainActivity');
        const loginBtn = await $('android=new UiSelector().resourceId("login-button")');
        await loginBtn.waitForDisplayed({ timeout: 60000 });
    });

    it('signs in, creates a promo code, verifies it, then logs out', async () => {
        // 1) Login
        const emailInput = await $('android=new UiSelector().resourceId("email-input")');
        await setValueWithRetry(emailInput, 'amr@test.test');

        const passwordInput = await $('android=new UiSelector().resourceId("password-input")');
        await setValueWithRetry(passwordInput, 'Abc@1234');

        const submitLogin = await $('android=new UiSelector().resourceId("login-button")');
        await clickWithRetry(submitLogin);

        // 2) Open the side menu
        const menuButton = await $('~Menu');
        await clickWithRetry(menuButton);

        // 3) Navigate to Promo Code Center
        const promoCenter = await $('android=new UiSelector().text("Promo Code Center")');
        await clickWithRetry(promoCenter);

        // 4) Tap "Create New Promo Code"
        const createNew = await $('~Create New Promo Code');
        await clickWithRetry(createNew);

        // 5) Fill in the form
        const promoCodeValue = `auto${Math.floor(Math.random() * 100000)}`;
        const nameInput = await $('~name-input');
        await setValueWithRetry(nameInput, promoCodeValue);

        await clickWithRetry(await $('android=new UiSelector().text("Select Type")'));
        await clickWithRetry(await $('android=new UiSelector().text("Percentage")'));

        const discountInput = await $('~discount-value-input');
        await setValueWithRetry(discountInput, '50');

        // 6) Pick a package
        await clickWithRetry(await $('~package-button'));
        await clickWithRetry(await $('android=new UiSelector().className("android.view.ViewGroup").instance(23)'));

        // 7) Hit Apply
        await clickWithRetry(await $('~Apply'));

        // 8) Set the valid-until date
        await clickWithRetry(await $('~valid-until-button'));
        await driver
            .action('pointer')
            .move({ x: 724, y: 1343 })
            .down()
            .move({ x: 728, y: 1078, duration: 1000 })
            .up()
            .perform();
        await clickWithRetry(await $('id:android:id/button1'));

        // 9) Create it
        await clickWithRetry(await $('android=new UiSelector().resourceId("create-promo-button-label")'));

        // 10) Refresh the list
        await driver
            .action('pointer')
            .move({ x: 463, y: 1552 })
            .down()
            .move({ x: 463, y: 608, duration: 1000 })
            .up()
            .perform();

        // 11) Verify the new promo code appears
        const createdItem = await $(`android=new UiSelector().textContains("${promoCodeValue}")`);
        await createdItem.waitForDisplayed({ timeout: 60000 });
        expect(await createdItem.isDisplayed()).to.be.true;

        // 12) Logout
        await clickWithRetry(await $('~Menu'));
        await clickWithRetry(await $('~Logout'));
        await clickWithRetry(await $('~Yes'));
    });
});

// import { expect } from 'chai';

// async function clickWithRetry(element) {
//     await element.waitForDisplayed({ timeout: 60000 });
//     await element.click();
// }

// async function setValueWithRetry(element, value) {
//     await element.waitForDisplayed({ timeout: 60000 });
//     await element.setValue(value);
// }

// describe(' promo code creation', () => {
//     before(async () => {
//         // Launch and wait for login screen
//         await driver.startActivity('com.willma.staging', 'com.willma.staging.MainActivity');
//         const loginBtn = await $('android=new UiSelector().resourceId("login-button")');
//         await loginBtn.waitForDisplayed({ timeout: 60000 });
//     });

//     it('should sign in and create a promo code', async () => {
//         // 1) Login
//         await setValueWithRetry(await $('android=new UiSelector().resourceId("email-input")'), 'amr@test.test');
//         await setValueWithRetry(await $('android=new UiSelector().resourceId("password-input")'), 'Abc@1234');
//         await clickWithRetry(await $('android=new UiSelector().resourceId("login-button")'));

//         // 2) Wait for home and open menu
//         const homeReady = await $('~Menu');
//         // await homeReady.waitForDisplayed({ timeout: 60000 });
//         await clickWithRetry(homeReady);

//         // 3) Navigate to Promo Code Center
//         const promoCodeCenter = await $('android=new UiSelector().text("Promo Code Center")');
//         await clickWithRetry(promoCodeCenter);

//         // 4) Create new promo
//         await clickWithRetry(await $('~Create New Promo Code'));
//         const promoCodeValue = `auto${Math.floor(Math.random() * 100000)}`;
//         await setValueWithRetry(await $('~name-input'), promoCodeValue);
//         await clickWithRetry(await $('android=new UiSelector().text("Select Type")'));
//         await clickWithRetry(await $('android=new UiSelector().text("Percentage")'));
//         await setValueWithRetry(await $('~discount-value-input'), '50');
        
//         // 5) Select package
//         await clickWithRetry(await $('~package-button'));
//         await clickWithRetry(await $('android=new UiSelector().className("android.view.ViewGroup").instance(23)'));

//         // 6) Apply
//         await clickWithRetry(await $('~Apply'));

//         // 7) Set valid-until date
//         await clickWithRetry(await $('~valid-until-button'));
//         await driver.action('pointer')
//             .move({ x: 724, y: 1343 })
//             .down()
//             .move({ x: 728, y: 1078, duration: 1000 })
//             .up()
//             .perform();
//         await clickWithRetry(await $('id:android:id/button1'));

//         // 8) Finalize
//         await clickWithRetry(await $('android=new UiSelector().resourceId("create-promo-button-label")'));

//         // 9) Swipe to refresh
//         await driver.action('pointer')
//             .move({ x: 463, y: 1552 })
//             .down()
//             .move({ x: 463, y: 608, duration: 1000 })
//             .up()
//             .perform();

//         // 10) Verify promo exists by checking list item
//         const createdItem = await $(`android=new UiSelector().textContains("${promoCodeValue}")`);
//         await createdItem.waitForDisplayed({ timeout: 60000 });
//         expect(await createdItem.isDisplayed()).to.be.true;

//         // 11) Logout
//         await clickWithRetry(await $('~Menu'));
//         await clickWithRetry(await $('~Logout'));
//         await clickWithRetry(await $('~Yes'));
//     });
// });




// import { expect } from 'chai';

// async function clickWithRetry(element) {
//     await element.waitForDisplayed({ timeout: 60000 });
//     await element.click();
// }

// async function setValueWithRetry(element, value) {
//     await element.waitForDisplayed({ timeout: 60000 });
//     await element.setValue(value);
// }

// describe('template workout and promo code creation', () => {
//     before(async () => {
//         await driver.startActivity('com.willma.staging', 'com.willma.staging.MainActivity');
//     });

//     it('should sign in and create a promo code', async () => {
//         const emailInput = await $('android=new UiSelector().resourceId("email-input")');
//         await setValueWithRetry(emailInput, 'amr@test.test');

//         const passwordInput = await $('android=new UiSelector().resourceId("password-input")');
//         await setValueWithRetry(passwordInput, 'Abc@1234');

//         const signInButton = await $('android=new UiSelector().resourceId("login-button")');
//         await clickWithRetry(signInButton);

//         const menuButton = await $('//android.view.View[@content-desc="Menu"]');
//         await clickWithRetry(menuButton);

//         const promoCodeCenter = await $('-android uiautomator:new UiSelector().text("Promo Code Center")');
//         await clickWithRetry(promoCodeCenter);

//         const el1 = await $('~Create New Promo Code');
//         await clickWithRetry(el1);

//         // Generate random promo code starting with 'auto' and a random number
//         const randomNumber = Math.floor(Math.random() * 100000);
//         const promoCodeValue = `auto${randomNumber}`;
//         const promocode = { value: promoCodeValue };

//         const el2 = await $('~name-input');
//         await setValueWithRetry(el2, promocode.value);

//         const el3 = await $('-android uiautomator:new UiSelector().text("Select Type")');
//         await clickWithRetry(el3);

//         const el4 = await $('-android uiautomator:new UiSelector().text("Percentage")');
//         await clickWithRetry(el4);

//         const el5 = await $('~discount-value-input');
//         await setValueWithRetry(el5, '50');

//         const el6 = await $('~package-button');
//         await clickWithRetry(el6);

//         const el7 = await $('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(23)');
//         await clickWithRetry(el7);

//         const el8 = await $('~Apply');
//         await clickWithRetry(el8);

//         const el9 = await $('~valid-until-button');
//         await clickWithRetry(el9);

//         // Scroll Date Picker
//         await driver.action('pointer')
//             .move({ duration: 0, x: 724, y: 1343 })
//             .down({ button: 0 })
//             .move({ duration: 1000, x: 728, y: 1078 })
//             .up({ button: 0 })
//             .perform();

//         const el10 = await $('id:android:id/button1');
//         await clickWithRetry(el10);

//         const el11 = await $('-android uiautomator:new UiSelector().resourceId("create-promo-button-label")');
//         await clickWithRetry(el11);

//         // Swipe to top to refresh or scroll
//         await driver.action('pointer')
//             .move({ duration: 0, x: 463, y: 1552 })
//             .down({ button: 0 })
//             .move({ duration: 1000, x: 463, y: 608 })
//             .up({ button: 0 })
//             .perform();

//         const el12 = await $('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(18)');
//         await clickWithRetry(el12);

//         const el13 = await $('-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(0)');
//         await clickWithRetry(el13);
       

//         const el14 = await $('~Logout');
//         await clickWithRetry(el14);

//         const el15 = await $('~Yes');
//         await clickWithRetry(el15);
//     });
// });

