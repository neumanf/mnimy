import axios from "axios";

import BaseHttpService from "./base-http.service";

interface IServerData {
    accessToken: string;
    username: string;
}

export default class AuthService extends BaseHttpService {
    async signin(username: string, password: string) {
        const result = await axios.post<IServerData>(
            `${this.BASE_URL}/auth/signin`,
            {
                username,
                password,
            }
        );
        const accessToken = result.data.accessToken;

        this.saveToken(accessToken);
        return result.data.username;
    }

    async signup(username: string, email: string, password: string) {
        console.log(username, email, password);

        await axios.post(`${this.BASE_URL}/auth/signup`, {
            username,
            email,
            password,
        });
    }

    async signout() {
        this.removeToken();
    }
}
