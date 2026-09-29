// 29-09-2026

import { test, expect, Locator, FrameLocator } from '@playwright/test';

test('Verify multiple frames', async({ page }) =>{

    await page.goto("https://app.thetestingacademy.com/playwright/frames/multi-frames");

    let mainFrame : FrameLocator = await page.frameLocator("[name='main']");

    const headerText = await mainFrame.locator("h2").innerText();
    console.log(headerText);  // Main frame — practice playground

    const allframes : Locator[] = await page.locator("//frame").all();
    console.log("Total number of frames :", allframes.length);  // Total number of frames : 3

    for(const frame of allframes)
    {
        console.log(await frame.getAttribute('name'), ' : ', await frame.getAttribute('src'));

        // side  :  ./side-frame.html
        // main  :  ./main-frame.html
        // footer  :  ./footer-frame.html
    }

    let sideFrame : FrameLocator = await page.frameLocator("[name='side']");
    await sideFrame.getByTestId("side-link-registration").click();


    await page.pause();
})