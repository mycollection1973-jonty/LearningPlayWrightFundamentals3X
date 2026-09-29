// 29-09-2026

import { test , expect } from '@playwright/test';

test('Verify the dropdown', async({ page }) =>{

    await page.goto("https://the-internet.herokuapp.com/dropdown");
    await page.locator('#dropdown').click();
    await page.selectOption("#dropdown", "Option 2");

    await page.pause();
})