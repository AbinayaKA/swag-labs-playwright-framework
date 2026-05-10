import { type Page } from "@playwright/test";

export class LoginPage {

    constructor(private readonly page: Page) {}

    private username = this.page.getByPlaceholder('Username');
    private password = this.page.getByPlaceholder('Password');
    private loginButton = this.page.locator('#login-button');
    public title = this.page.locator('.title');
    public errorMessage = this.page.locator("[data-test='error']");

    async navigateToLogin() {
        await this.page.goto('/');
    }

    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}