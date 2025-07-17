import { expect } from 'chai';

async function clickWithRetry(element) {
    await element.waitForDisplayed({ timeout: 60000 });
    await element.click();
}

async function setValueWithRetry(element, value) {
    await element.waitForDisplayed({ timeout: 60000 });
    await element.setValue(value);
}

describe('template workout and promo code creation', () => {
    before(async () => {
        await driver.startActivity('com.willma.staging', 'com.willma.staging.MainActivity');
    });

    it('should sign in and create a promo code', async () => {
        const emailInput = await $('android=new UiSelector().resourceId("email-input")');
        await setValueWithRetry(emailInput, 'amr@test.test');

        const passwordInput = await $('android=new UiSelector().resourceId("password-input")');
        await setValueWithRetry(passwordInput, 'Abc@1234');

        const signInButton = await $('android=new UiSelector().resourceId("login-button")');
        await clickWithRetry(signInButton);

        const menuButton = await $('//android.view.View[@content-desc="Menu"]');
        await clickWithRetry(menuButton);

        const promoCodeCenter = await $('-android uiautomator:new UiSelector().text("Promo Code Center")');
        await clickWithRetry(promoCodeCenter);

        const el1 = await $('~Create New Promo Code');
        await clickWithRetry(el1);

        const el2 = await $('~name-input');
        await setValueWithRetry(el2, 'auto');

        const el3 = await $('-android uiautomator:new UiSelector().text("Select Type")');
        await clickWithRetry(el3);

        const el4 = await $('-android uiautomator:new UiSelector().text("Percentage")');
        await clickWithRetry(el4);

        const el5 = await $('~discount-value-input');
        await setValueWithRetry(el5, '50');

        const el6 = await $('~package-button');
        await clickWithRetry(el6);

        const el7 = await $('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(23)');
        await clickWithRetry(el7);

        const el8 = await $('~Apply');
        await clickWithRetry(el8);

        const el9 = await $('~valid-until-button');
        await clickWithRetry(el9);

        // Scroll Date Picker
        await driver.action('pointer')
            .move({ duration: 0, x: 724, y: 1343 })
            .down({ button: 0 })
            .move({ duration: 1000, x: 728, y: 1078 })
            .up({ button: 0 })
            .perform();

        const el10 = await $('id:android:id/button1');
        await clickWithRetry(el10);

        const el11 = await $('-android uiautomator:new UiSelector().resourceId("create-promo-button-label")');
        await clickWithRetry(el11);

        // Swipe to top to refresh or scroll
        await driver.action('pointer')
            .move({ duration: 0, x: 463, y: 1552 })
            .down({ button: 0 })
            .move({ duration: 1000, x: 463, y: 608 })
            .up({ button: 0 })
            .perform();

        const el12 = await $('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(18)');
        await clickWithRetry(el12);

        const el13 = await $('-android uiautomator:new UiSelector().className("com.horcrux.svg.PathView").instance(0)');
        await clickWithRetry(el13);
        await clickWithRetry(el13); // Double click if needed

        const el14 = await $('~Logout');
        await clickWithRetry(el14);

        const el15 = await $('~Yes');
        await clickWithRetry(el15);
    });
});
