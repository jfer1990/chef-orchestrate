import { AuthService } from './auth.service';
import { HttpCode, Post, Body, HttpStatus, Req, Controller } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { type Request } from 'express';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(
        @Body() signInDto:SignInDto, 
        @Req() req:Request,
    ){

        const deviceType = req.deviceInfo?.deviceType; 
        const token = await this.authService.signIn(
            signInDto.email, 
            signInDto.password, 
            deviceType ?? ''
        );
        return ({tokens:token}); 
    }

    @HttpCode(HttpStatus.OK)
    @Post('refresh-token')
    async refreshToken(
        @Body() tokenDTO:RefreshTokenDto, 
        @Req() req:Request,
    ){

        const {refreshToken, email} = tokenDTO; 

        const token = await this.authService.regenerateUserTokens(
            email,
            refreshToken
        );
        return ({tokens:token}); 
    }
}
