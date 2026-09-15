// 15-09-2026

import { test, expect } from '@playwright/test';

test('tc#1 - Verify that vwo page is loaded', async({page})=>{

    await page.goto("https://app.vwo.com", {
        waitUntil : 'domcontentloaded',
        timeout : 3000,
        referer : "https://sdet.live"
    });

    // Defalt Locators
    //  id, name, className, Tag., Custom Locator (Via CSS selector)

    // Css Seclector ->  Browser - Css Engine, Help you to find the element
    // by using the default locators
    // id => #id
    // className => .
    // name => [name="value"]
    // Tag => [tag]

    // <input 
    // type="email" 
    // class="text-input W(100%)" 
    // name="username" 
    // vwo-html-translate-attr="placeholder" 
    // vwo-html-translate-placeholder="login:enterEmailID" 
    // id="login-username" 
    // data-qa="hocewoqisi" 
    // placeholder="Enter email ID" 
    // data-gtm-form-interact-field-id="0"
    // >

    // where Promise is there in response we will add await there

    let userNameField = page.locator("#login-username");
    let passwordField = page.locator("#login-password");
    let loginButton = page.locator("#js-login-btn");

    await userNameField.fill("abc@gmail.com");
    await passwordField.fill("pass1234");
    await loginButton.click();

    let error_message = page.locator("#js-notification-box-msg");
    await expect(error_message).toContainText("Your email, password, IP address or location did not match");

    await page.pause();  // it will pause the screen
})