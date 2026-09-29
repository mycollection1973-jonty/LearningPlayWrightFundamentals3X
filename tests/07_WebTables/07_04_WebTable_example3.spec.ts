// 26-09-2026
// FILTER & hasCSS Selector
import { test, expect, Locator } from '@playwright/test';

test('Verify the Test Case using Filter', async({ page }) => {
    
    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");

    const forgottenPasswordLink = await page.locator("a.list-group-item")
                                            .filter({ hasText : 'Forgotten Password'});
    await forgottenPasswordLink.click();

    const privacyLink = await page.locator("footer a").filter({ hasText : 'Privacy Policy'});
    await expect(privacyLink).toHaveAttribute('href', '#privacy-policy');

    await page.pause();
})