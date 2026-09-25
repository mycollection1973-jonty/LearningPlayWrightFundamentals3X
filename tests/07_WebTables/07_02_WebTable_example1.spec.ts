// 24-09-2026

import { test, expect, Locator } from '@playwright/test';

test('Verify the Web Table Example 1', async({ page }) => {

    await page.goto("https://awesomeqa.com/webtable.html");

    //table[@id='customers']//tbody/tr[5]/td[2]
    // 5 - i , 1 to 7 ( 1 header) 2 to 7
    // ]/td[
    // 2 - j , j -> 1,2,3
    // ]

    const firstPart = "//table[@id='customers']/tbody/tr[";
    const secondPart = "]/td[";
    const thirdPart = "]";

    const row = await page.locator("//table[@id='customers']/tbody/tr").count();
    const cols = await page.locator("//table[@id='customers']/tbody/tr[2]/td").count();

    for(let i=2; i<=row; i++)
    {
        for(let j=1;j<=cols;j++)
        {
            const dynamicPath = `${firstPart}${i}${secondPart}${j}${thirdPart}`;
            //console.log(dynamicPath);  // //table[@id='customers']/tbody/tr[5]/td[2]
            const data = await page.locator(dynamicPath).innerText();
            //console.log(data); //   Helen Bennett

            if(data.includes('Helen Bennett'))
            {
                const countryPath = `${dynamicPath}/following-sibling::td`;
                const countryName = await page.locator(countryPath).innerText();
                console.log('----------');
                console.log(`Helen Bennett is in -> ${countryName}`);
            }
        }
    }
})