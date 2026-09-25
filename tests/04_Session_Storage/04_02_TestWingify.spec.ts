// 22-09-2026
//npx playwright test tests/04_Session_Storage/04_02_TestWingify.spec.ts --reporter=list  
import { test, expect } from '@playwright/test';

//  load the saved session

test.use(
    {
        storageState : './user-session.json'
       // screenshot : 'only-on-failure',
    }
);

test("go directly to dashboard - Test1", async({ page })=>{
    await page.goto("https://app.wingify.com/#/dashboard?accountId=1281775");
    await expect(page).toHaveURL(/dashboard/);
    console.log("Dashboard loaded - no login needed ✅");
    await page.waitForTimeout(3000);
});

test("go directly to dashboard2 - Test2", async({ page })=>{
    await page.goto("https://app.wingify.com/#/dashboard?accountId=1281775");
    await expect(page).toHaveURL(/dashboard/);
    console.log("Dashboard loaded - no login needed ✅");
    await page.waitForTimeout(3000);
});

test("go directly to dashboard3 - Test3", async({ page })=>{
    await page.goto("https://app.wingify.com/#/dashboard?accountId=1281775");
    await expect(page).toHaveURL(/dashboard/);
    console.log("Dashboard loaded - no login needed ✅");
    await page.waitForTimeout(3000);
});