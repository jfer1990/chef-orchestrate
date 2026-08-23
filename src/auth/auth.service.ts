import { Injectable } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { User } from '@users/entities/user.entity';
import { SessionService } from '@sessions/sessions.service';
import { JwtService } from '@nestjs/jwt'; 
import {NotFoundException,UnauthorizedException } from '@nestjs/common'; 
import bcrypt from 'bcryptjs'; 

interface Payload {
    sub: string | number, 
    username: string
}

@Injectable()
export class AuthService {
    private refreshTokenDays = 7; 
    constructor(
        private readonly user:UsersService,
        private readonly session:SessionService,
        private jwtService:JwtService
    ){}

    async signIn(username:string, password:string, deviceType:string){
        
        const {id,email} = await this.validateUser({ username, password }); 
        const payload: Payload = { 
            sub: id, 
            username: email 
        };

        const {accessToken, refreshToken} = await this.generateTokens(payload);
        const dateFactory = new Date(); 
        dateFactory.setDate(dateFactory.getDate() + this.refreshTokenDays);  

        await this.session.addNewSession({
            refreshToken, 
            userId:id,
            deviceType, 
            isActive:true,
            expiresAt: new Date(dateFactory)
        }); 
        return {accessToken, refreshToken}; 
        
    }

    async regenerateUserTokens(userEmail:string, refreshToken:string){

        const user = await this.user.findByEmail(userEmail); 
        if(!user) throw NotFoundException; 

        const {id, email} = user; 
        const validToken = await this.session.getValidSession(id, refreshToken);
        console.log("valid token:");  
        console.log(validToken); 
        if(!validToken) throw UnauthorizedException; 

        const payload: Payload = { 
            sub: id, 
            username: email 
        };

        const tokens = await this.generateTokens(payload);
        const hashRefreshToken = await bcrypt.hash(tokens.refreshToken,10); 

        this.session.updateSessionToken(id,hashRefreshToken); 
        return {
            accessToken: tokens.accessToken, 
            refreshToken: hashRefreshToken
        }

    }

    private async validateUser({ username, password }: { username: string; password: string; }):Promise<User>{
        const user = await this.user.findByEmail(username);

        if(!user) throw NotFoundException.createBody("","Email is not registered",400); 
        const isValidUser = await bcrypt.compare(password, user.password); 

        if(!isValidUser){
            throw UnauthorizedException.createBody("", "Credentials are invalid", 400); 
        }
        return user; 
    }

    private async generateTokens(payload: Payload){
        const accessToken = await this.jwtService.signAsync(payload,{
            secret:'secret', 
            expiresIn:'60m',
        }); 



        const refreshToken = await this.jwtService.signAsync(payload, {
            secret:'secret', 
            expiresIn: `${this.refreshTokenDays}d`, 
        });

        return ({accessToken, refreshToken}); 

    }
}
