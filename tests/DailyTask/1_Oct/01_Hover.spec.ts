// 1-10-2026

import { test, expect } from '@playwright/test';

test('Verify the hover', async({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/widgets/hover-menu");

    await page.getByTestId("nav-add-ons").hover();
    await page.getByRole('menuitem', {name : "Wi-Fi"}).click();

    const output = await page.locator("div.submission-output").innerText();
    console.log(output);

    await expect(output).toContain("Wi-Fi");

    await page.pause();

})