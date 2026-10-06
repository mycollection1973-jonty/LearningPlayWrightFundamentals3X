// 6-10-2026

import { test, expect, Locator } from '@playwright/test';
import path from 'path';

const URL = "https://www.patternfly.org/components/file-upload/multiple-file-upload/";

test.describe('FileUpload handling', () => {

    test.beforeEach(async({ page }) => {
        await page.goto(URL);
    });

    test('locate fileupload and upload pdf, jpg and doc', async({ page }) => {

        const pdfFile = path.join(__dirname, 'sample.pdf');
        const jpgFile = path.join(__dirname, 'sample.jpg');
        const docFile = path.join(__dirname, 'sample.docx');
        console.log(pdfFile);
        console.log(jpgFile);
        console.log(docFile);

        await page.locator("div.pf-v6-c-multiple-file-upload input").setInputFiles([pdfFile, jpgFile, docFile]);

        await page.pause();

    //      const files = [
    //      path.join(__dirname, 'sample.pdf'),
    //      path.join(__dirname, 'sample.jpg'),
    //      path.join(__dirname, 'sample.doc'),
    //   ];
    //   files.forEach(f => console.log(f));

    //   await page.locator("div.pf-v6-c-multiple-file-upload input").setInputFiles(files);

    //   const uploadArea = page.locator('div.pf-v6-c-multiple-file-upload');
    //   await expect(uploadArea).toContainText('sample.pdf');
    //   await expect(uploadArea).toContainText('sample.jpg');
    //   await expect(uploadArea).toContainText('sample.doc');

    })
});
