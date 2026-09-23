// 22-09-2026
// npm install dotenv --save  -> this for env
//.env file wont shared in git while .env.example will be shared but user have to give their creds
// there is error so we run it through Command code by saying ca we run 04_01
// npx tsx tests/04_Session_Storage/231_SessionStorage.ts 2>&1 | tail -30
// this will run only one time
import { chromium } from 'playwright';
import dotenv from "dotenv";

dotenv.config();
// Credentials live in .env (gitignored) — never hardcode them in a public repo.

const VWO_USER = process.env.VWO_USER;
const VWO_PASS = process.env.VWO_PASS;

async function saveSession(){
    // 9r2l98q6ct@fpklm.com
    // Testtta@1234
    let browser = await chromium.launch({ headless : false });
    let context = await browser.newContext();
    let page = await context.newPage();

    await page.goto("https://app.vwo.com/#/login");

    await page.fill("#login-username", VWO_USER);
    await page.fill("#login-password", VWO_PASS);

    await page.click("#js-login-btn");
    await page.waitForURL(/#\/(dashboard|home)/, { timeout : 15000 });

    await context.storageState({ path : "./user-session.json"});
    console.log("Session saved for user-session.json ✅");

    //await page.waitForTimeout(2000);
    await browser.close();
}

saveSession();