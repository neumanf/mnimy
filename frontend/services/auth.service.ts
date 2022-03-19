import BaseHttpService from './base-http.service';

export default class AuthService {
    async signin(username: string, password: string) {
        await BaseHttpService.post('/auth/signin', {
            username,
            password,
        });
    }

    async signup(username: string, email: string, password: string) {
        await BaseHttpService.post('/auth/signup', {
            username,
            email,
            password,
        });
    }

    async signout() {}
}
