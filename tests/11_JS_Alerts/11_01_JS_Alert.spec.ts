// 1-10-2026

import { test, expect } from '@playwright/test';

test.describe('Javascript Alerts', ()=>{
    test.beforeEach(async({ page }) =>{
        await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    });

    test('JS Alert accept 1', async({ page }) => {
        page.once('dialog', async dialog =>{
            console.log('Alert Type:',dialog.type());
            console.log('Alert Message:',dialog.message());
            expect(dialog.message()).toBe('I am a JS Alert');
            await dialog.accept();
        });
        await page.getByRole('button' , {name : 'Click for JS Alert', exact : true}).click();
        await page.pause();
    });

    test('JS Alert accept 2',async({ page })=> {
        page.once('dialog',async dialog =>{
            console.log('Alert Type:',dialog.type());
            expect(dialog.type()).toBe('confirm');
            console.log('Alert Message:',dialog.message());
            expect(dialog.message()).toBe('I am a JS Confirm');
            await dialog.accept();
        });
        await page.locator('button', {hasText : 'Click for JS Confirm'}).click();
        await expect(page.locator('#result')).toHaveText('You clicked: Ok');
    });

    test('JS Alert accept 3', async({ page }) => {

        const inputText = "Hello to All of you";
        page.once('dialog', async dialog => {
            expect(dialog.type()).toBe('prompt');
            expect(dialog.defaultValue()).toBe('');
            await dialog.accept(inputText);
        });
        await page.locator('button', {hasText :'Click for JS Prompt'}).click();
        await expect(page.locator('#result')).toHaveText(`You entered: ${inputText}`);
    });
});
