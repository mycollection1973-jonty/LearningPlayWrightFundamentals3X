// 6-10-2026

import {test, expect, Locator} from '@playwright/test';

test.describe('File Uploade demo - Testingacademy', () => {

    test.beforeEach(async({ page}) => {
        await page.goto("https://app.thetestingacademy.com/playwright/widgets/upload-download");
    });

    test('demo : download setInputFiles', async({ page }) => {

        const [staticDownload] = await Promise.all([
            page.waitForEvent('download'),
            page.getByTestId('download-static').click()
        ]);

        await staticDownload.saveAs('./out/' + staticDownload.suggestedFilename());

        await page.pause();

    });
});