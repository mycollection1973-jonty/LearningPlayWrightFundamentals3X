// 15-09-2026

import { test, expect } from '@playwright/test';

test('Verify page header name', async({ page }) => {

    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    let makeApptButton = page.locator("#btn-make-appointment");
    let userNameField = page.locator("#txt-username");
    let passwordField = page.locator("#txt-password");
    let loginButton = page.locator("#btn-login");

    await makeApptButton.click();
    await userNameField.fill("John Doe");
    await passwordField.fill("ThisIsNotAPassword");
    await loginButton.click();

    let header = page.locator("h2");
    await expect(header).toContainText("Make Appointment");
    
});