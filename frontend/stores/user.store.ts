import { observable, action } from "mobx";

import AuthService from "../services/auth.service";

class UserStore {
    @observable username: string | null = null;

    constructor(private readonly authService: AuthService) {}

    @action
    async signin(username: string, password: string) {
        this.username = await this.authService.signin(username, password);
    }

    @action
    async signup(username: string, email: string, password: string) {
        return this.authService.signup(username, email, password);
    }

    @action
    signout() {
        this.username = null;
        this.authService.removeToken();
    }
}

const userStore = new UserStore(new AuthService());
export default userStore;
