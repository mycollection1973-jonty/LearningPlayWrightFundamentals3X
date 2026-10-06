// 6-10-2026

import { test, expect, Locator } from '@playwright/test';

test.describe('Shadow handling' , () =>{

    const URL = "https://app.thetestingacademy.com/playwright/widgets/shadow-dom";

    test.beforeEach(async({ page }) => {
        await page.goto(URL);
    });

    test('locate Shadow DOM and assert visible', async({ page })=> {

        const card = page.getByTestId("card-account-card");
        await card.locator("input[name='email']").fill("student@testinacdemy.com");
        await card.locator("input[name='password']").fill("abc@123");
        await card.getByTestId("card-account-submit").click();
        await expect(page.getByTestId("card-account-status")).toContainText("student@testinacdemy.com");

        const cart = page.getByTestId("counter-cart");
        await cart.getByRole('button', {name : 'Increment'}).click();
        await cart.getByRole('button', {name : 'Increment'}).click();
        await expect(cart.getByTestId("counter-value")).toHaveText('5');

        await page.getByTestId("card-inside-card");
        await page.getByTestId("card-inside-email").fill("rohit@gmail.com");
        await page.getByTestId("card-inside-password").fill("abc@987");
        await page.getByTestId("card-inside-submit").click();

        await page.pause();

    });

});