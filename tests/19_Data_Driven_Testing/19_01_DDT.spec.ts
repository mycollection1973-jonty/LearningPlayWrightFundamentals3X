//13-10-2026

import { test, expect} from '@playwright/test';
import userData from './19_02_Users.json';

test('Verify DDT', async({ page }) => {

    console.log(userData.username);
    console.log(userData.password);
});