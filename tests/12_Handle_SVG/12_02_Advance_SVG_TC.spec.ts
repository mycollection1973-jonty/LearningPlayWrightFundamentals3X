// 3-10-2026

import {test, expect, Locator} from '@playwright/test';

const URL = "https://app.thetestingacademy.com/playwright/widgets/svg";

test.describe('SVG handling', () => {

    test.beforeEach(async( { page }) => {
        await page.goto(URL);
    });

    test('Locate SVG root and assert visible', async({ page }) => {

        const circleShape : Locator = page.locator("#circle-blue");
        await circleShape.click();

        const output = await page.locator("#shapes-output").innerText();
        console.log(output);
        expect(output).toContain("Blue circle");

        await page.getByRole("button",{name : /Q3 bar/}).click();  // / means contains or matching    

        await page.getByRole("radio", {name : '4 stars'}).click();

        let allBars  = await page.locator(".bar").all();
        for (const bar of allBars)
        {
            // logic which is the height, low......... click on that
            
            const q = await bar.getAttribute('data-quarter');
            const h = await bar.getAttribute('data-value');
            console.log(q);
            console.log(h);
        }

        await page.pause();

    });

});
