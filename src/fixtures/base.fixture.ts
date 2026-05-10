import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AddToCartPage } from '../pages/addtocart.page';
import { CheckoutHelper } from '../helpers/checkout.helper';
import { ApiClient } from '../api/api.client';
import { AuthApi } from '../api/auth.api';
import { BookingApi } from '../api/booking.api';

type PageFixtures = {
    loginPage: LoginPage;
    addToCartPage: AddToCartPage;
    checkoutHelper: CheckoutHelper;
    apiClient: ApiClient;
    authApi: AuthApi;
    bookingApi: BookingApi;
}

export const test = base.extend<PageFixtures>({
    loginPage: async({page}, use) => {
        await use(new LoginPage(page));
    },
    addToCartPage: async({page}, use) => {
        await use(new AddToCartPage(page));
    },
    checkoutHelper: async ({addToCartPage}, use) => {
        await use(new CheckoutHelper(addToCartPage));
    },
    apiClient: async ({ request }, use) => {
        await use(new ApiClient(request));
    },
    authApi: async ({ apiClient }, use) => {
        await use(new AuthApi(apiClient));
    },
    bookingApi: async({ apiClient }, use) => {
        await use(new BookingApi(apiClient));
    }
})

export { expect } from '@playwright/test';