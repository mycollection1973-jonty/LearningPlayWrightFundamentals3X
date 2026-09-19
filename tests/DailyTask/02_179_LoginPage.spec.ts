// 17-09-2026

// Check url after clickon Login with wrong credentials

import { test, expect } from '@playwright/test';

test("Verify url page of TTA", async ({ page })=> {

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");

    let emailId = page.locator("#email");
    let password = page.locator("#password");
    let checkBox = page.locator("//input[@type='checkbox']");
    let loginBtn = page.locator("//button[@class='login-btn']");

    await emailId.fill("abcd@qa.com");
    await password.fill("123456");
    await checkBox.click();
    await loginBtn.click();

    await expect(page).toHaveURL("https://app.thetestingacademy.com/playwright/multiple_element_filter?email=abcd%40qa.com&password=123456&remember=yes#login-success");

    await page.pause();

})