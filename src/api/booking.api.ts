import { ApiClient } from './api.client';
import { currentEnv } from '../configs/env.manager';

export class BookingApi {

    constructor(private readonly apiClient: ApiClient) {}

    async getAllBookings() {
        return await this.apiClient.get(`${currentEnv.apiUrl}/booking`);
    }

    async getBooking(id: number) {
        return await this.apiClient.get(`${currentEnv.apiUrl}/booking/${id}`);
    }

    async createBooking(payload: object) {
        return await this.apiClient.post(`${currentEnv.apiUrl}/booking`, payload);
    }

    async updateBooking(id: number, payload: object, headers: Record<string, string>) {
        return await this.apiClient.put(`${currentEnv.apiUrl}/booking/${id}`, payload, headers);
    }

    async partialUpdateBooking(id: number, payload: object, headers: Record<string, string>) {
        return await this.apiClient.patch(`${currentEnv.apiUrl}/booking/${id}`, payload, headers);
    }

    async deleteBooking(id: number, headers: Record<string, string>) {
        return await this.apiClient.delete(`${currentEnv.apiUrl}/booking/${id}`, headers);
    }
}