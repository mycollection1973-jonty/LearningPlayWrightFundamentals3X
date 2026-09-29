// 29-09-2026

import { test, expect, Locator, FrameLocator } from '@playwright/test';

test('Verify the IFrame', async({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/frames/");
    let vehicleFrame : FrameLocator = await page.frameLocator("#frame-one");

    await vehicleFrame.locator("#RESULT_TextField-1").fill("Thar");
    await vehicleFrame.locator("#RESULT_TextField-2").fill("Andrew");
    await vehicleFrame.locator("#RESULT_TextField-3").fill("KL-09-CU-4344");

    await vehicleFrame.locator("#RESULT_RadioButton-1").selectOption("SUV");

    await vehicleFrame.locator("#RESULT_TextField-4").fill("2022");
    await vehicleFrame.locator("#RESULT_TextArea-1").fill("This is a dangerous car for road");

    await vehicleFrame.getByText("Submit registration", {exact : true}).click();

    let output = await vehicleFrame.locator("#vehicle-output").innerText();
    console.log(output);

    await page.pause();
})