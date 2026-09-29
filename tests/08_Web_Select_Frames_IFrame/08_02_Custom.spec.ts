// 29-09-2026

import{ test, expect } from '@playwright/test';

test('Verify Custom drop down', async({ page }) =>{
    
    await page.goto("https://app.thetestingacademy.com/playwright/tables/dropdowns");
    await page.getByTestId("lang-trigger").click();
    await page.getByRole("option", { name : "Javascript"}).click();

    //await page.getByText("JavaScript").first().click();  -> not working

    await page.getByTestId("experience-trigger").click();
    await page.getByText("Mid-level (4-6 years)", {exact : true}).click();

    await page.pause();
});