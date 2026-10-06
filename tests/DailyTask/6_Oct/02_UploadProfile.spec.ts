// 6-10-2026

import { test,expect,Locator} from '@playwright/test';

const URL = "https://app.thetestingacademy.com/student/dashboard";
test.describe('Upload profile', () => {

    test.beforeEach(async({ page })=> {
        await page.goto(URL);
    })

    test('check the upload profile', async({ page }) => {

        await page.getByPlaceholder('Enter your email address').fill('mycollection1973@gmail.com');
        await page.getByRole('button', { name : 'Continue', exact : true}).click();

        //const settings =  await page.getByText('Settings');


        await page.pause();

    }) 

})