// 6-10-2026
// this was created by AI
import { test, expect, Locator } from '@playwright/test';
import path from 'path';

const URL = "https://www.patternfly.org/components/file-upload/multiple-file-upload/";

test.describe('FileUpload handling', () => {

    test.beforeEach(async({ page }) => {
        await page.goto(URL);
    });

    test('locate fileupload and upload', async({ page }) => {

        // Real files living next to this spec, instead of in-memory buffers.
      // __dirname is this file's folder, so the paths work no matter where
      // the runner is started from.

        const file1 = path.join(__dirname, 'file1.jpeg');
        const file2 = path.join(__dirname, 'file2.jpeg');
        console.log(file1);
        console.log(file2);

        await page.locator("div.pf-v6-c-multiple-file-upload input").setInputFiles([file1, file2]);

        // The dropzone lists what it accepted, so assert on the names.
      const uploadArea = page.locator('div.pf-v6-c-multiple-file-upload');
      await expect(uploadArea).toContainText('file1.jpeg');
      await expect(uploadArea).toContainText('file2.jpeg');


        await page.pause();

    })
});
