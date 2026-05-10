import { faker } from '@faker-js/faker';

export interface BookingPayload {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid : boolean;
    bookingdates : {
        checkin : string;
        checkout : string;
    },
    additionalneeds : string;
}
export class DataGenerator {

    static generateUser() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            postalCode: faker.location.zipCode()
        };
    }

    static userPayload = (overrides = {}): BookingPayload => ({
        firstname: faker.person.firstName(),
        lastname : faker.person.lastName(),
        totalprice : faker.number.int({ min: 100, max: 1000 }),
        depositpaid : true,
        bookingdates : {
            checkin : faker.date.past().toISOString().split('T')[0],
            checkout : faker.date.soon().toISOString().split('T')[0]
        },
        additionalneeds : faker.food.dish(),
        ...overrides
    })
}