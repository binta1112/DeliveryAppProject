import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto} from '../users/dto/userCreate.dto'
import { Res, HttpStatus } from '@nestjs/common';
import express, { response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login( @Body() {email,password},@Res() res: express.Response): Promise<any> {
       const response = await this.authService.login(email,password);
       if(response!==null) {
        return  res.status(HttpStatus.OK).json(response);
       }
      return res.status(HttpStatus.UNAUTHORIZED).json({message:'Invalid credentials'});
    }
    @Post('signup')
    async signup(@Body() user: CreateUserDto, @Res() res: express.Response): Promise<any> {
        console.log('Received signup request:', user);
        if(user===null || user===undefined) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid user data' });
        }
        const response = await this.authService.signup(user);
        if (response) {
            return res.status(HttpStatus.CREATED).json(response);
        }
        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'User registration failed' });
    }

   
}

