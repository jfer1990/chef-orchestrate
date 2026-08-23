import { type UserSchema } from "@drizzle/users/schema";
import { type CreateSessionType } from "@sessions/dto/create-session.dto";


export class RefreshTokenDto implements 
Omit<
UserSchema & CreateSessionType, 
'id'|'name'|'createdAt'|'updatedAt' | 'userId'|'deviceType' | 'refreshTokenHash'|'expiresAt' | 'isActive' | 'password' >{
    email!: string;
    refreshToken!: string;
}


