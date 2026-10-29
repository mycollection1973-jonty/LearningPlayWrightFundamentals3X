import { test, expect } from '@playwright/test';

test('Test Calender and date picker', async ({ page}) => {

    await page.goto('https://app.thetestingacademy.com/playwright/widgets/calendar');

    // Select one way trip
    await page.getByRole('tab', {name : 'One-way'}).click();

    // 1. Open departure date picker
    await page.getByTestId('trigger-depart').click();

    let picker = await page.getByTestId('date-picker');
    await expect(picker).toBeVisible();

    // 2. Select Departure date
    await page.getByTestId('day-2026-11-22').click();

    // 3. Click Search flights
    await page.getByRole('button', { name : 'Search flights'}).click();

    // 4. Assertion
    await expect(page.getByTestId('search-output')).toContainText('2026-11-22');

    await page.pause();
})