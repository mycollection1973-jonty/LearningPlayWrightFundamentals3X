// 19-09-2026

import { test, expect } from '@playwright/test';

test("Verify Button functioning", async({ page })=>{

    await page.goto("https://katalon-demo-cura.herokuapp.com/#appointment");
    let mainButton = page.getByRole("link", {name : "Make Appointment", exact : true});
    await mainButton.click();
    await page.pause();
})