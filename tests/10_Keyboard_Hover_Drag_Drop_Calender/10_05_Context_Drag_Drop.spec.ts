// 1-10-2026

import { test, expect } from '@playwright/test';

test('Verify the drag and drop', async({ page }) =>{

    await page.goto("https://app.thetestingacademy.com/playwright/widgets/context-menu");

    await page.getByTestId("ctx-target").first().click({ button : 'right'});
   // await page.locator("span.context-menu-one").click({ button : 'right' });

    const alloptions : string[] = await page.locator("#ctx-menu span").allInnerTexts();
    console.log(alloptions);

    await page.getByText('Copy', {exact : true}).first().click();
    
    await page.pause();
});