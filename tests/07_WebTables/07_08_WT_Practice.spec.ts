import {test, expect} from '@playwright/test';

test('Check the table', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const rows = await page.locator('table[name="BookTable"] tbody tr');
    const rowscount = await rows.count();
    console.log(rowscount);

    for(let i=0;i<=rowscount-1;i++)
    {   
        // const header = await rows.nth(i).locator("th").allInnerTexts();
        const data = await rows.nth(i).locator("td").allInnerTexts();
        // console.log(`Row ${i+1} :`,header);
        console.log(`Row ${i+1} :`,data)
    }


    // const fp = "//table[@name='BookTable']/tbody/tr["
    // const sp = "]/td[";
    // const tp = "]";

    // const row = await page.locator('//table[@name="BookTable"]/tbody/tr').count();
    // const col = await page.locator('//table[@name="BookTable"]/tbody/tr[2]/td').count();

    // console.log(row); //7
    // console.log(col); //4

    // for(let i=2;i<=row;i++)
    // {
    //     for(let j=1; j<=col;j++)
    //     {
    //         const dynamiPath = `${fp}${i}${sp}${j}${tp}`;
    //         const names = await page.locator(dynamiPath).innerText();
    //        // console.log(names);

    //         if(names.includes('Amod'))
    //         {
    //             const cousre = `${dynamiPath}/preceding-sibling::td`;
    //             const bookName = await page.locator(cousre).innerText();
    //             console.log('-------------------');
    //             console.log(`Your cousre is ${bookName}`);
    //         }
    //     }
    //}
})