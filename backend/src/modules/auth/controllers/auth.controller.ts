import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { SignInCredentialsDto } from '../dto/signin-credentials.dto';
import { SignUpCredentialsDto } from '../dto/signup-credentials.dto';
import { LoginGuard } from '../guards/login.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body() signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        await this.authService.signUp(signUpCredentialsDto);
    }

    @UseGuards(LoginGuard)
    @Post('/signin')
    async signIn(@Body() signInCredentialsDto: SignInCredentialsDto): Promise<void> {
        await this.authService.signIn(signInCredentialsDto);
    }
}
