import { test, expect } from '../../fixtures/base.fixture';
import { DataGenerator } from '../../utils/randomdata.util';

test.describe('Add to cart tests', async () => {

    test('@regression Verify add to cart and checkout', async ({ addToCartPage }) => {
        await test.step('Verify add to cart', async () => {
            await addToCartPage.navigateToInventory();
            await addToCartPage.addToCart('Sauce Labs Bolt T-Shirt');
            await expect(addToCartPage.itemCount).toHaveText('1');
        })

        await test.step('Verify checkout', async () => {
            const user = DataGenerator.generateUser();
            await addToCartPage.checkoutItem(user.firstName, user.lastName, user.postalCode);
            await expect(addToCartPage.checkoutStatus).toHaveText('Thank you for your order!');
        })
    })

    test('@sanity Verify checkout flow', async ({ addToCartPage, checkoutHelper }) => {
        await checkoutHelper.completeCheckout('Sauce Labs Bolt T-Shirt');
        await expect(addToCartPage.checkoutStatus).toHaveText('Thank you for your order!');
    })
})

