// 6-10-2026

import { test, expect, Locator} from '@playwright/test';

const URL = "https://selectorshub.com/xpath-practice-page/";

test.describe('Check Selectohub page', () => {    

    test.beforeEach(async({ page}) =>{
        await page.goto(URL);
    });

    test('check the fields', async({ page }) => {

        const learn = page.locator("#userName");
        await learn.getByPlaceholder('enter name').fill('Dominoz');
        await learn.getByPlaceholder('Enter pizza name').fill('cheese');

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        
        await page.keyboard.type('abc@123');

        await page.pause();

    })
});