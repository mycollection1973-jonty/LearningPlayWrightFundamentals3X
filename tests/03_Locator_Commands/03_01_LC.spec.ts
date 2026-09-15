// 12-09-2026

import { test, expect } from '@playwright/test';

test("Verify X", async({page})=>{

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter"
        ,{ waitUntil : 'commit'}
    );
//15-09-2026
    const response = await page.goto('https://app.thetestingacademy.com/login', {
        waitUntil : 'domcontentloaded',
        timeout : 45000,
        referer : 'https://thetestingacademy.com'
    });

})