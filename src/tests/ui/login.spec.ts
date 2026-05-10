import { test, expect } from '../../fixtures/base.fixture';
import { users } from "../../test-data/users";
import { messages } from "../../test-data/messages";

test.describe('Login tests', async () => {

    test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToLogin();
    })

    test('@sanity Verify login with valid credentials', async ({ loginPage }) => {
        await loginPage.login(users.standard.userName, users.standard.password);
        await expect(loginPage.title).toHaveText('Products');
    })

    test('@regression Verify login with invalid credentials', async ({ loginPage }) => {
        await loginPage.login(users.standard.userName, users.standard.userName);
        await expect(loginPage.errorMessage).toContainText(messages.loginError);
    })
})