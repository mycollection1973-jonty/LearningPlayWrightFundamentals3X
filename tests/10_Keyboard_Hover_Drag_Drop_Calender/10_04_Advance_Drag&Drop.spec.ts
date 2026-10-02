// 1-10-2026

import { test, expect, Locator } from '@playwright/test'

test('Verify drag and drop in Kanban board', async({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/widgets/dnd");
    // const inprogress = page.locator("[data-status='in-progress']");
    // await page.locator("#card-review-pr-21").dragTo(inprogress);   -- > this wont work because of focus 

    //let source : Locator = page.locator("#card-review-pr-21");
    let source:Locator = page.locator('#card-write-spec');
    const sBox = (await source.boundingBox())!;

    let target: Locator = page.locator('[data-status="in-progress"]');
    const tBox = (await target.boundingBox())!;

    await page.mouse.move(sBox.x + sBox.width / 2, sBox.y + sBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(tBox.x + tBox.width / 2, tBox.y + tBox.height / 2, { steps: 10 });
    await page.mouse.up();


    await page.pause();
})