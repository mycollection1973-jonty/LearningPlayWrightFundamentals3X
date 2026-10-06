// 6-10-2026

import { test, expect, Locator } from '@playwright/test';
import path from 'path';

test.describe('FileUpload hadnling', () => {

    const URL = "https://app.thetestingacademy.com/playwright/widgets/upload-download";
    test.beforeEach(async({ page}) => {
        await page.goto(URL, {waitUntil : 'domcontentloaded'});
    });

    test('Locate fileupload and upload', async({ page}) => {

        const filepath = path.join(__dirname,'testdata.txt');
        console.log(filepath);

        await page.locator("#single-upload").setInputFiles([filepath]);

        await page.pause();

    })
});