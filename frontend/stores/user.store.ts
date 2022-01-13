import { observable, action } from 'mobx';
import Cookies from 'js-cookie';

import AuthService from '../services/auth.service';

class UserStore {
    constructor(private readonly authService: AuthService) {}

    @action
    async signin(username: string, password: string) {
        await this.authService.signin(username, password);
    }

    @action
    async signup(username: string, email: string, password: string) {
        return this.authService.signup(username, email, password);
    }

    @action
    isLoggedIn() {
        // FIX
        return Cookies.get('SESSION_ID');
    }
}

const userStore = new UserStore(new AuthService());
export default userStore;
