// 15-10-2026

import { test, expect } from '@playwright/test';
import { Pages } from './pages/HeavyPages';

test.describe('Heavy page object', () => {

    test('Login, add the first item and verify the cart', async ({ page }, testInfo) => {

        const pages = new Pages(page);

        await test.step('Login with standard_user', async () => {
            await page.goto('https://app.thetestingacademy.com/playwright/ttacart/');
            await pages.locator001.fill('standard_user');
            await pages.locator002.fill('tta_secret');
            await pages.locator003.click();
            await testInfo.attach('step-0-login-page', { body: await page.screenshot(), contentType: 'image/png' });
        });

        await test.step('Add the first item to the cart', async () => {
            await pages.locator004.click();
            await testInfo.attach('step-1-item-added', { body: await page.screenshot(), contentType: 'image/png' });
            await pages.locator006.click();
        });

        await test.step('Verify the item is in the cart', async () => {
            await expect(page).toHaveURL(/\/cart$/);
            await expect(pages.locator016).toBeVisible();
            await testInfo.attach('step-2-cart-page', { body: await page.screenshot(), contentType: 'image/png' });
        });
    })
})
