import { expect } from 'chai';
import { faker } from '@faker-js/faker';
import { TouchAction } from 'wdio-mobile-utils'; // optional helper if you're using one


async function restartUiAutomator2Server() {
    console.log('Restarting UiAutomator2 server...');
    await driver.deleteSession(); // End the current session
    await driver.startSession(); // Start a new session
    console.log('UiAutomator2 server restarted.');
}

describe('Signup Flow', () => {
    before(async () => {
        try {
            // Launch the app
            await driver.startActivity(
                'com.willma.staging',
                'com.willma.staging.MainActivity'
            );
            console.log('App launched successfully.');
        } catch (error) {
            console.error('Error launching the app:', error);
            await restartUiAutomator2Server(); // Restart UiAutomator2 if needed
        }
    });

    it('should sign up successfully with fake data and select any photo', async () => {
        // Try partial text match
        let signUpText;
        try {
            signUpText = await $('android=new UiSelector().className("android.widget.TextView").textContains("Sign Up")');
            await signUpText.waitForDisplayed({ timeout: 30000 });
            await signUpText.click();
        } catch (e) {
            // Fallback: try XPath for partial text
            signUpText = await $('//android.widget.TextView[contains(@text, "Sign Up")]');
            await signUpText.waitForDisplayed({ timeout: 30000 });
            await signUpText.click();
        }
        // ...continue test...
    });
});