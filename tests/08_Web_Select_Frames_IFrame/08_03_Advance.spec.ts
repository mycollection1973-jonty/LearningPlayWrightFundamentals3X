// 29-09-2026

import { test, expect} from '@playwright/test';

test('Verify the advance drop down', async({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/select-boxes");

    // ① Single — searchable

    await page.locator("#rs-single").click();
    //await page.getByRole("option" , {name : "Cypress"}).click();
    await page.getByText("Cypress").click();

    // ②  Multi — chips with remove

    await page.locator("#rs-multi").click();
    await page.getByText("Pytest", {exact : true}).click();
    await page.getByText("JUnit", {exact : true}).click();
    await page.keyboard.press("Escape");

    // ③ Creatable multi — type and Enter

    await page.locator("#rs-creatable").click();
    await page.getByText("api-testing", {exact : true}).click();
    await page.getByText("security", {exact : true}).click();
    await page.keyboard.press("Enter");

    // ⑤ Async — fetched on type

    await page.locator("#rs-async").click();
    await page.getByTestId("rs-async-input").fill("de");
    await expect( page.getByTestId("rs-async-menu")).toContainText("Delhi");
    await page.getByRole("option", {name : "Delhi", exact : true}).click();


    

    const options = page.locator('[data-testid="rs-async-menu"] .tta-rs__option');
    const n: string[] = await options.allInnerTexts();

    for (const names of n) 
    {
        console.log(names);
    } 
    await page.pause();
});