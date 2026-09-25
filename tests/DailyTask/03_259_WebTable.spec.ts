// 24-09-2026

import { test, expect } from '@playwright/test';

test('Verify check box for the name', async({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/webtable");

    const firstPart = "//table[@aria-label='Employee Management System table']/tbody/tr[";
    const secondPart = "]/td["
    const thirdPart = "]";

    const row = await page.locator("//table[@aria-label='Employee Management System table']/tbody/tr").count();
    const cols = await page.locator("//table[@aria-label='Employee Management System table']/tbody/tr[3]/td").count();

    for(let i=1;i<=row;i++)
    {
        for(let j=1;j<=cols;j++)
        {
            const dynamicPath = `${firstPart}${i}${secondPart}${j}${thirdPart}`;
            const data = await page.locator(dynamicPath).innerText();
            console.log(data);
            
            if(data.includes('Rohan.Mehta'))
            {
                const checkbox = `${dynamicPath}/preceding-sibling::td`;
                await page.locator(checkbox).click();
            }
        }
    }

    await page.pause();
});