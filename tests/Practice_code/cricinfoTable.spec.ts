import {test, expect} from '@playwright/test';

test('Check the table', async({ page }) => {

    await page.goto('https://www.cricinfo.com/');

    await page.locator('i.icon-search-outlined').click();

    await page.getByPlaceholder('Search Players, Teams or Series',{exact : true}).fill('James Franklin');
    await page.keyboard.press('Enter');

    await page.pause();
})