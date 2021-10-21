import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        return this.authService.signUp(signUpCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() signInCredentialsDto: SignInCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(signInCredentialsDto);
    }
}
