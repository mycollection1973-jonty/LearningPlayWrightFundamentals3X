// 19-09-2026

import { test, expect } from '@playwright/test';

test("Verify the error message in the wingify free trial" , async({ page})=>{

    await page.goto("https://app.wingify.com/#/login");
    let username = page.getByRole("textbox", {name : "Email", exact : true});
    let password = page.getByRole("textbox", {name : "Password"});

   // username.nth(1);
    await username.fill('admin@vwo.com');
    await password.fill('1234');

    await page.pause();

})