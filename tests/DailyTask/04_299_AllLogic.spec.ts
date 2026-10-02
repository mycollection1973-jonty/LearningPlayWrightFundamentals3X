// 290-09-2026

import{ test, expect, Locator, FrameLocator } from '@playwright/test';

test('Verify the QA Profile page', async({ page }) =>{

    await page.goto("https://app.thetestingacademy.com/playwright/tables/practice#page");

    await page.getByTestId("first-name").fill("James");
    await page.getByTestId("last-name").fill("Franklin");

    await page.getByRole("radio", {name : "Male"}).first().click();

    await page.locator("#years-experience").click();
    await page.selectOption("#years-experience", "5");

    await page.getByTestId("profile-date").fill("2026-09-16");

    //page.getByLabel("Automation Tester").click();
    await page.locator("[name='profession']").nth(1).click();

    console.log("--------Automation Tools----")
    const tools = await page.locator("input[name='tools']");
     for( let i=0;i< await tools.count();i++)
    {
            await tools.nth(i).check();
            console.log(await tools.nth(i).getAttribute("value"))
    }

    console.log("--------Continents you worked---------------");
    const continents = await page.locator("[name='continents']");
    for(let i=0; i<3;i++)
    {
        await continents.nth(i).check();
        console.log(await continents.nth(i).getAttribute("value"));
    }
    //page.getByText("Asia", {exact : true}).click();

    //page.getByRole("button", {name : "Wait Commands", exact : true}).click();
    page.getByTestId("tab-wait").click();

    await page.getByRole("button", {name : "Save profile", exact : true}).click();

    // Comapring Output with Input
    let output = await page.locator("#submission-output").innerText();
    console.log(output);

    const result = JSON.parse(output);

    expect(result.firstName).toBe("James");
    expect(result.lastName).toBe("Franklin");
    expect(result.gender).toBe("Male");
    expect(result.yearsExperience).toBe("5");
    expect(result.date).toBe("2026-09-16");
    expect(result.profession).toBe("Automation Tester");
    expect(result.tools).toEqual(["UFT","Protractor","Selenium Webdriver"]);
    expect(result.continents).toEqual(["Asia","Europe","Africa"]);

    await page.pause();

})