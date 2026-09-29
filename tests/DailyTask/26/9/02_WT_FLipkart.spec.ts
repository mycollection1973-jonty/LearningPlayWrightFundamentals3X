// 26-09-2026

import { test, expect, Locator } from '@playwright/test';

test('Verify the lis in Flipkart', async({ page }) => {

    await page.goto("https://www.flipkart.com/");

    let searchBar = page.getByRole('textbox',{name : "Search for Products, Brands and More"});
    await page.locator("//span[@role='button']").click();
    await searchBar.fill("DSLR Camera");
    await searchBar.press("Enter");

    let nextButton = page.locator("a:has(span)").filter({ hasText : 'Next'});
   
    //const nextButton = page.getByText("Next", { exact: true });
    
    while(true)
    {
        const cameraName : string[] = await page.locator("div.RG5Slk").allInnerTexts();
        const cameraPrice : string[] = await page.locator("div.hZ3P6w.DeU9vF").allInnerTexts();
        
        console.log("Count of cameras in single page:", cameraName.length);

        for( let i=0; i<cameraName.length;i++)
        {
            console.log(`Camera Name : ${cameraName[i]} || Camera Price : ${cameraPrice[i]}`);
        }
        
        if (await nextButton.count() === 0) {
            console.log("Next button is not available. Last page reached.");
            break;
        }

        const href = await nextButton.getAttribute("href");

        if (!href) {
            console.log("Next URL is not available.");
            break;
        }

        console.log("Next URL:", href);

        await page.goto("https://www.flipkart.com" + href);

        await page.locator("div.RG5Slk").first().waitFor();
         
    }
     
    await page.pause();  
});