import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService
    ) {}

    async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        return this.usersRepository.createUser(signUpCredentialsDto);
    }

    async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = signInCredentialsDto;
        const user = await this.usersRepository.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username };
            const accessToken: string = this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('invalid login credentials');
        }
    }
}
