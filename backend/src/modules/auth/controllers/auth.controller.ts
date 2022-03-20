import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { SignUpCredentialsDto } from '../dto/signup-credentials.dto';
import { LoginGuard } from '../guards/login.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body() signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        await this.authService.signUp(signUpCredentialsDto);
    }

    @UseGuards(LoginGuard)
    @Post('/signin')
    async signIn() {
        return { statusCode: 200, message: 'Signed in successfully' };
    }

    @Get('/signout')
    signOut(@Req() req: Request) {
        req.logout();
        req.session.cookie.maxAge = 0;

        return { statusCode: 200, message: 'Signed out successfully' };
    }
}
