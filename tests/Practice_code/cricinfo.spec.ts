import {test, expect} from '@playwright/test';
import { lstatSync } from 'node:fs';

test('Check Cricinfo page', async({ page }) => {
    await page.goto('https://www.cricinfo.com/');
    const list : string[] = await page.locator('ul li a').allInnerTexts();
    console.log(list.length);

    for(const lt of list)
    {
       console.log(lt);
      if(lt === 'Hindi Videos')
       {
        await page.getByText(lt).first().click();
       }       
    }
  
    await page.pause();
})