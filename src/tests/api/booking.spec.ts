import { test, expect } from '../../fixtures/base.fixture';
import {BookingPayload, DataGenerator} from '../../utils/randomdata.util';

test.describe('E2E Booking flow', async () => {

    test('Booking tests', async ({ authApi, bookingApi }) => {
        let id: number;
        let payload: BookingPayload;

        await test.step('Create a booking with payload', async () => {
            payload = DataGenerator.userPayload();
            const response = await bookingApi.createBooking(payload);
            expect(response.status()).toBe(200);
            const body = await response.json();
            id = body.bookingid;
            expect(body.booking.firstname).toContain(payload.firstname);
            expect(body.booking.lastname).toContain(payload.lastname);
        })

        await test.step('Update a booking using cookie', async () => {
            const authToken = await authApi.generateToken();
            const authBody = await authToken.json();
            const headers = { Cookie:`token=${authBody.token}` };
            payload = DataGenerator.userPayload();
            const response = await bookingApi.updateBooking(id, payload, headers);
            expect(response.status()).toBe(200);
            const updateBody = await response.json();
            expect(updateBody.depositpaid).toBe(payload.depositpaid);
        })

        await test.step('Partial update a booking using cookie', async () => {
            const authToken = await authApi.generateToken();
            const authBody = await authToken.json();
            const headers = { Cookie:`token=${authBody.token}` };
            payload = DataGenerator.userPayload({'depositpaid': false});
            const response = await bookingApi.partialUpdateBooking(id, payload, headers);
            expect(response.status()).toBe(200);
            const updateBody = await response.json();
            expect(updateBody.depositpaid).toBe(payload.depositpaid);
        })

        await test.step('Get the updated booking', async () => {
            const response = await bookingApi.getBooking(id);
            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body.firstname).toContain(payload.firstname);
            expect(body.lastname).toContain(payload.lastname);
        })

        await test.step('Delete a booking using basic auth', async () => {
            const authKey = authApi.generateAuthorizationKey();
            const headers = { Authorization: `Basic ${authKey}` };
            const response = await bookingApi.deleteBooking(id, headers);
            expect(response.status()).toBe(201);
        })

        await test.step('Verify if the booking is deleted', async () => {
            const response = await bookingApi.getBooking(id);
            expect(response.status()).toBe(404);
        })
    })

})