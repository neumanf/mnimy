import BaseHttpService from './base-http.service';

export default class AuthService extends BaseHttpService {
    async signin(username: string, password: string) {
        await this.post('/auth/signin', {
            username,
            password,
        });
    }

    async signup(username: string, email: string, password: string) {
        await this.post('/auth/signup', {
            username,
            email,
            password,
        });
    }

    async signout() {}
}
