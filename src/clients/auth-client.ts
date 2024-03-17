import axios from "axios";
import { inject, injectable } from "inversify";
import TYPES from "../types";
import { AppOptions } from "../options/app-options";

export interface IAuthClient {
    login(email: string, password: string): Promise<any>;
}

@injectable()
export class AuthClient implements IAuthClient {
    private readonly baseUrl: string;

    constructor(@inject(TYPES.AppOptions) appOptions: AppOptions) {
        this.baseUrl = `${appOptions.hostname}:${appOptions.authPort}`
    }

    async login(email: string, password: string): Promise<any> {
        const response = await axios.post(`${this.baseUrl}/connect/token`, new URLSearchParams({
            client_id: "amogus",
            grant_type: "password",
            scope: "offline_access",
            username: email,
            password: password
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        
        return response.data;
    }
}
