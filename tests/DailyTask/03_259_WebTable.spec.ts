// 24-09-2026

import { test, expect } from '@playwright/test';

test('Verify check box for the name', async({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/webtable");

    const firstPart = "//table[@aria-label='Employee Management System table']/tbody/tr[";
    const secondPart = "]/td["
    const thirdPart = "]";

    const row = await page.locator("//table[@aria-label='Employee Management System table']/tbody/tr").count();
    const cols = await page.locator("//table[@aria-label='Employee Management System table']/tbody/tr[3]/td").count();


})