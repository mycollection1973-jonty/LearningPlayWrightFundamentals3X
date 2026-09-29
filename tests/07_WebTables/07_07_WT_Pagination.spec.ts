// 26-09-2026
// by using function

import {test, expect, Locator, Page} from '@playwright/test';

async function findRowByName(page: Page, name: string) : Promise<Locator>{
    while(true)
    {
        const row = page.locator("#employees-tbody tr").filter({ hasText : name });
        if( await row.count())
        {
            return row;
        }

        const next = page.getByTestId('next-page');
        if(await next.isDisabled())
        {
            throw new Error(`Row Not Found: ${name}`);
        }
        await next.click();
    } 
}

test('Verify the Test case for Pagination', async({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");

    let name : string = "Camila Lopez";
    const row = await findRowByName(page, 'Camila Lopez');
    const email = await row.locator("td[data-col='email']").innerText();
    const country = await row.locator("td[data-col='country").innerText();
    console.log(email, country);

    await page.pause();
    
});

