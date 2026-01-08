import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto} from '../users/dto/userCreate.dto'
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    login( @Body() {email,password}): any {
        console.log('Login endpoint called');
        return this.authService.login(email, password);
    }
    @Post('signup')
    signup( @Body() user:CreateUserDto): any {
        return this.authService.signup(user);
    }
   
}

