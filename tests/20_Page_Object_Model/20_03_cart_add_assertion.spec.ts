// 15-10-2026
// this was created by AI 
//file:///C:/Users/rohit/Work/LearningPlayWrightFundamentals3X/tta-report/report_20261015_141809.html.
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { Inventorypage } from './pages/InventoryPage';
import { Cartpage } from './pages/CartPage';

test.describe('POM - add the first item and assert the cart', () => {

    test('Add first item and verify it in the cart', async ({ page }, testInfo) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new Inventorypage(page);
        const cartPage = new Cartpage(page);

        await test.step('Login with standard_user', async () => {
            await loginPage.goto();
            await loginPage.login('standard_user', 'tta_secret');
            await testInfo.attach('step-0-login-page', { body: await page.screenshot(), contentType: 'image/png' });
        });

        await test.step('Add the first item to the cart', async () => {
            await inventoryPage.firstAddToCartButton.click();
            await testInfo.attach('step-1-item-added', { body: await page.screenshot(), contentType: 'image/png' });
            await inventoryPage.shoppingCartContainerSvg.click();
        });

        await test.step('Verify the item is in the cart', async () => {
            await expect(page).toHaveURL(/\/cart$/);
            await expect(cartPage.inventoryItemName).toHaveText('Test.allTheThings() T-Shirt (Red)');
            await testInfo.attach('step-2-cart-page', { body: await page.screenshot(), contentType: 'image/png' });
        });
    })
})
