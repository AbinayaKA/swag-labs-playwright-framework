import { chromium } from '@playwright/test';
import { currentEnv } from './src/configs/env.manager';

async function globalSetup() {
    const authFile = 'playwright/.auth/user.json';
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(currentEnv.baseUrl);
    await page.fill('[placeholder="Username"]', 'standard_user');
    await page.fill('[placeholder="Password"]', 'secret_sauce');
    await page.click('#login-button');
    await page.context().storageState({ path: authFile });
    await browser.close();
}

export default globalSetup;