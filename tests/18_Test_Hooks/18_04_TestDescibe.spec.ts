// 10-10-2026

import {test, expect} from '@playwright/test';

test.describe.serial('Checkout suite - must run in order', () => {
    test('open landing', async() => {console.log('1')});
    test('search product', async() => {console.log(2)});
    test('add to cart', async() => {console.log('3')});
    test('got to checkout', async() => {console.log('4')});
});

// These two run un parallel - independent of the serial suite above
test('standalone A', async() => {console.log('A')});
test('standalone B', async() => {console.log('B')});