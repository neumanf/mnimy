import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignUpCredentialsDto } from '../dto/signup-credentials.dto';
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
