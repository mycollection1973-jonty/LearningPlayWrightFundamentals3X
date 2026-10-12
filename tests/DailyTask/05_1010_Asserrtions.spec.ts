 // 10-10-2026

 import {test, expect} from '@playwright/test';

 test.describe('Find assertions for page', () => {

    const URL = 'https://app.thetestingacademy.com/playwright/multiple_element_filter';

    test.beforeEach(async({page}) => {
        await page.goto(URL);
    });

    test('Find assertion', async({ page}) => {

        await expect(page).toHaveURL(URL);

        const url = page.url();
        await expect(url).toContain('playwright');

        await expect(page).toHaveTitle(/Multiple Element/);
        

        const header = await page.locator('#login-heading');
        await expect(header).toBeVisible();
        await expect(header).toBeEnabled();
        await expect(header).toContainText('Login', {timeout : 5000});
        await expect(page.locator('h2')).toHaveText('Student Login');

        const greenIcon = await page.getByText('Secure Practice');
        await expect(greenIcon).toBeVisible();
        await expect(greenIcon).toContainText('Practice', {timeout : 5000});
        await expect(greenIcon).not.toContainText('happy');
        
        const emailText = await page.getByRole('textbox', {name : 'Email Address'});
        await expect(emailText).toHaveId('email');
        await expect(emailText).toHaveAttribute('id','email');
        await expect(emailText).toHaveAttribute('type','email');
        await emailText.fill('test@test.com');
        await expect(emailText).toHaveValue('test@test.com');
        await expect(emailText).not.toHaveValue('test@test1.com');
             
        // const passText = await page.getByRole('textbox', {name : 'Password'});
        // await expect(passText).toHaveAttribute('id','password');
        // await expect(passText).toHaveAttribute('type','password');
        // await expect(passText).toHaveAttribute('placeholder','Enter your password');

        await page.getByLabel('Password').click();
        await expect(page.getByLabel('Password')).toBeFocused();
        //await expect.soft(page.locator('#password')).not.toBeVisible();
        await expect(page.locator('#password')).toBeEditable();
        await expect(page.locator('#password')).toBeEmpty();
        

        await expect(page.getByRole('button', {name : 'Login to Practice Account'})).toContainText('to Practice');
        
        await expect(page.getByRole('link', {name: 'Forget password?'})).toBeEnabled();

        await page.getByRole('checkbox', {name : 'Remember me'}).check();
        await expect(page.getByRole('checkbox',{name :'Remember me'})).toBeChecked();

        const accSync = await page.locator('div.social-row a');
        await expect(accSync).toHaveCount(2);

        let title = await page.title();
        await expect(title).not.toContain('error');
        await expect(title).toBeTruthy();       
            
        await page.pause();
    })
 })