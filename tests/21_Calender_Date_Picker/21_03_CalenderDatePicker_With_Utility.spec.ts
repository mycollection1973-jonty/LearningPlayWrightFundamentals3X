import { test, expect, Page } from '@playwright/test';

test('Select calender and date picker with utility', async({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/widgets/calendar');

    let departureDate = '2026-11-29';
    let returnDate = '2027-01-11';

    await page.getByTestId('trip-roundtrip').click();

    await page.getByTestId('trigger-depart').click();

    // Select Departure date
    await selectDate(page, departureDate);

    await page.getByTestId('trigger-return').click();

    // Click next month button and select a date in the next month
    await page.getByTestId('next-month').click();
    await selectDate(page, returnDate);

    await page.getByTestId('search-flights').click();

    // Assertion 
    await expect(page.getByTestId('search-output')).toContainText(departureDate);
    await expect(page.getByTestId('search-output')).toContainText(returnDate);

    await page.pause();
});

async function selectDate(page: Page, date: string){
    
    // 1. Wait for the date picker to be visible
    let picker = page.getByTestId('date-picker');
    await expect(picker).toBeVisible();

    // 2. Locator for the target day cell 
    const day = picker.getByTestId('day-' + date);

    // 3. Keep clicking Next button until the target date appears in the DOM
    // capped at 24 clicked ~2 years so a bad/unreachable date fails instead of looping forever
    for (let i=0; i<24; i++)
    {
        if(await day.count()>0) break;
        await picker.getByTestId('next-month').click();
    }

    // 4. Click the target date
    await day.click();
}