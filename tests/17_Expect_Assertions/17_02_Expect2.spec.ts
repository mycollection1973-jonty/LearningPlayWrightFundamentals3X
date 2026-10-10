// 10-10-2026

import { test, expect} from '@playwright/test';

test.describe('Scroll the element', () => {

    test.beforeEach(async({page}) => {
        await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter.html')
    });

    test('Execute', async({ page }) => {

        const heading = page.getByText('multiple element filters', { exact : true});
        await expect(heading).toBeVisible();
        await expect(heading).toContainText('filter', {timeout : 10000});

        const email = page.getByRole('textbox', { name : 'Email Address'});
        await expect(email).toHaveAttribute('id','email');
        await expect(email).toHaveAttribute('id','email');
        await expect(email).toHaveAttribute('palcaeholder','student@thetestingacademy.com');

        const footerlinks = page.locator('footer a');
        await expect(footerlinks).toHaveCount(16);

    });
})