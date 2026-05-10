import {expect, test} from '../../fixtures/base.fixture';
import { currentEnv } from "../../configs/env.manager";

const authFile = 'playwright/.auth/user.json';
test('Login user', async ({ loginPage, page }) => {
    await loginPage.navigateToLogin();
    await loginPage.login(currentEnv.userName, currentEnv.password);
    await expect(page).toHaveURL(/inventory/);
    await page.context().storageState({ path: authFile })
})