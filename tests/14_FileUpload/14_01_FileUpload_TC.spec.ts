// 6-10-2026

import { test, expect, Locator } from '@playwright/test';
import path from 'path';

const URL = "https://the-internet.herokuapp.com/upload"

test.describe('FileUpload handling', () => {
    
    test.beforeEach(async({ page }) => {
        await page.goto(URL, {waitUntil : 'domcontentloaded'});
    });

    test('locate Fileupload and upload', async({ page }) =>{
        // File Upload
        // Path of the file 
        const filepath = path.join(__dirname,'testdata.txt');
        console.log(filepath);

        // __dirname : current working directory full path
        await page.locator("#file-upload").setInputFiles([filepath]);
        await page.getByRole('button', {name : 'Upload'}).click();
        await expect(page.locator("#uploaded-files")).toContainText('testdata.txt');
    })
});