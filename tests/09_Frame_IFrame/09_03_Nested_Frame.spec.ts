// 29-09-2026

import{ test, expect, Locator, FrameLocator } from '@playwright/test';

test("Verify the nested frames", async({ page }) => {

    await page.goto("https://selectorshub.com/iframe-scenario/");

    let frame1 : FrameLocator = page.locator("#pact1").first().contentFrame();
    let frame2 : FrameLocator = page.locator("#pact2").first().contentFrame();
    let frame3 : FrameLocator = page.locator("#pact3").first().contentFrame();

    await frame1.locator("#inp_val").first().fill("Sonali");
    await frame2.locator("#jex").fill("Friend");
    await frame3.locator("#glaf").fill("Sydney");

    const headerText = await frame1.locator("h3").innerText();
    console.log(headerText);
    await page.waitForTimeout(5000);

    await page.pause();
})