// 24-09-2026

import { test, expect, Locator } from '@playwright/test';

test('Verify the Web Table Example 2', async({ page }) =>{

    await page.goto("https://awesomeqa.com/webtable1.html");

    const rows = page.locator('table[summary="Sample Table"] tbody tr');
    const rowCount = await rows.count();

    for(let i=0; i<=rowCount-1;i++)
    {
        // const colsheader = await rows.nth(1).locator('th').allInnerTexts();
        const rowData = await rows.nth(i).locator("td").allInnerTexts();
        console.log(`Rows ${i+1}: `, rowData);
    }
    await page.pause();
})