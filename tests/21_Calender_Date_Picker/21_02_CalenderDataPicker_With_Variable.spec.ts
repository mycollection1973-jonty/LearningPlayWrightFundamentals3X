import { test, expect } from '@playwright/test';

test('Test Calender and date picker with variable' , async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/widgets/calendar');

    // Booking dates, this can come from config file or data file, or can be generated dynamically
    let departureDate = '2026-11-29';
    let returnDate = '2026-12-16';

    // Select Round trip
    await page.getByTestId('trip-roundtrip').click();

    // 1. Open departure date picker
    await page.getByTestId('trigger-depart').click();

    let dpicker = await page.getByTestId('date-picker');
    await expect(dpicker).toBeVisible();

    // 2. Select Departure date
    await page.getByTestId('day-'+ departureDate).click();

    // 3. Select return Date
    await page.getByTestId('trigger-return').click();
    let rpicker = await page.getByTestId('date-picker');
    await expect(rpicker).toBeVisible();

    // Click Next month button and select a date in the next month
    await page.getByTestId('next-month').click();
    await page.getByTestId('day-' + returnDate).click();

    // 4. Search Flights
    await page.getByTestId('search-flights').click();

    // Assertion
    await expect(page.getByTestId('search-output')).toContainText(departureDate);
    await expect(page.getByTestId('search-output')).toContainText(returnDate);

    await page.pause();

})