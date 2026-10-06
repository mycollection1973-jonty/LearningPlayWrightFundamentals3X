// 3-10-2026

import { test, expect, Locator} from '@playwright/test';

const simpleMaps = "https://simplemaps.com/svg/country/in";

test.describe('SVG handling', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(simpleMaps);
    });

    test('locate all the states in the map', async({ page }) => {
        const states = await page.locator("//div[@id='admin1_map_holder']//*[name()='svg']/*[name()='path' and contains(@class,'sm_state')]").all();

        for (let state of states)
        {
            const classState = await state.getAttribute('class');
            console.log(classState);
            if (classState?.includes("INUP"))
            {
                state.click();
            }
        }

        await page.pause();
    }) ; 
});