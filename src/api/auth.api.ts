import { ApiClient } from "./api.client";
import { currentEnv } from "../configs/env.manager";

export class AuthApi {

    constructor(private readonly apiClient: ApiClient) {}

    async generateToken() {
        return await this.apiClient.post(`${currentEnv.apiUrl}/auth`, { username: currentEnv.apiUsername, password: currentEnv.apiPassword });
    }

    generateAuthorizationKey() {
        return Buffer.from(`${currentEnv.apiUsername}:${currentEnv.apiPassword}`).toString('base64');
    }
}