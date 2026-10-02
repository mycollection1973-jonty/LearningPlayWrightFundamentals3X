// 1-10-2026

import{ test, expect } from '@playwright/test';

test('Verify the amount', async({ page }) => {
    
    await page.goto("https://demo.applitools.com/");

    await page.locator("[placeholder='Enter your username']").fill("Admin");
    await page.locator("#password").fill("Password@123");
    await page.locator(".btn.btn-primary").click();

    await expect(page).toHaveURL("https://demo.applitools.com/app.html");

    const row = await page.locator("//table[@class='table table-padded']/tbody/tr").count();
    console.log(`No. of rows: ${row}`);
    const col = await page.locator("//table[@class='table table-padded']/tbody/tr[1]/td").count();
    console.log(`No. of columns: ${col}`);

  
            
    let amount : string[] = await page.locator("//table[@class='table table-padded']/tbody/tr/td[5]").allInnerTexts();
    console.log(amount);

    const numbers : number[] = amount.map(amount => {
         const cleaned = amount
        .replace(/USD/g, "")
        .replace(/,/g, "")
        .trim()
        .replace(/\s+/g, "");

        return Number(cleaned);

        });

     const positive = numbers.filter(num => num>0);
     const positivesum = positive.reduce((sum,num) => sum+num,0);
     console.log(`Earned amount: ${positive}`);  
     console.log(`Total earned amount: ${positivesum}`); 

     const negative = numbers.filter(num=> num<0);
     const negativesum = negative.reduce((sum,num) => sum+num,0);
     console.log(`Spend amount: ${negative}`);
     console.log(`Total spend amount: ${negativesum}`);

     let difference = (positivesum - Math.abs(negativesum)).toFixed(2);
     console.log(difference);

     expect(difference).toBe("1996.22");

      await page.pause();
});