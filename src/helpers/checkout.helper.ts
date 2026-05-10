import { AddToCartPage } from '../pages/addtocart.page';
import { DataGenerator } from '../utils/randomdata.util';

export class CheckoutHelper {

    constructor(readonly addToCartPage: AddToCartPage) {}

    async completeCheckout(itemName: string) {
        const user = DataGenerator.generateUser();
        await this.addToCartPage.navigateToInventory();
        await this.addToCartPage.addToCart(itemName);
        await this.addToCartPage.checkoutItem(user.firstName, user.lastName, user.postalCode);
    }
}