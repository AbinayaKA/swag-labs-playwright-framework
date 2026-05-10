import { APIRequestContext } from '@playwright/test';

export class ApiClient {

    constructor(private readonly request: APIRequestContext) {}

    async get(url: string) {
        return await this.request.get(url);
    }

    async post(url: string, payload: object) {
        return await this.request.post(url, { data: payload });
    }

    async put(url: string, payload: object, headers: Record<string, string>) {
        return await this.request.put(url, { data: payload, headers });
    }

    async patch(url: string, payload: object, headers: Record<string, string>) {
        return await this.request.patch(url, { data: payload, headers });
    }

    async delete(url: string, headers: Record<string, string>) {
        return await this.request.delete(url, { headers });
    }
}