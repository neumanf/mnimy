import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignUpCredentialsDto } from '../dto/signup-credentials.dto';
import { SignInCredentialsDto } from '../dto/signin-credentials.dto';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<User> {
        const { username, email, password } = signUpCredentialsDto;
        const hashedPassword = await this.hashPassword(password);

        return this.userService.create(username, email, hashedPassword);
    }

    async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<User> {
        const { username, password } = signInCredentialsDto;
        const user = await this.validateUser(username, password);

        if (!user) throw new UnauthorizedException('invalid login credentials');

        return user;
    }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findByUsername(username);
        const result = await bcrypt.compare(password, user.password);

        return result ? user : null;
    }

    private async hashPassword(password: string) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    }
}
