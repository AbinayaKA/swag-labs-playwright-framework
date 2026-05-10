import { type Page } from "@playwright/test";

export class AddToCartPage {

    constructor(private readonly page: Page) {}

    private inventoryItem = this.page.locator('.inventory_item');
    public itemCount = this.page.locator('.shopping_cart_badge');
    private cartLink = this.page.locator('.shopping_cart_link');
    private checkoutButton = this.page.locator('#checkout');
    private firstName = this.page.locator('#first-name');
    private lastName = this.page.locator('#last-name');
    private postalCode = this.page.locator('#postal-code');
    private continueButton = this.page.locator('#continue');
    private finishButton = this.page.locator('#finish');
    public checkoutStatus = this.page.locator('.complete-header');

    async navigateToInventory() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }
    async addToCart(itemName: string) {
        const product = this.inventoryItem.filter({ hasText: itemName });
        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    async navigateToCheckout() {
        await this.cartLink.click();
        await this.checkoutButton.click();
    }

    async fillCheckoutDetails(firstName: string, lastName: string, postalCode: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async completeCheckout() {
        await this.continueButton.click();
        await this.finishButton.click();
    }

    async checkoutItem(firstName: string, lastName: string, postalCode: string) {
        await this.navigateToCheckout();
        await this.fillCheckoutDetails(firstName, lastName, postalCode);
        await this.completeCheckout();
    }
}