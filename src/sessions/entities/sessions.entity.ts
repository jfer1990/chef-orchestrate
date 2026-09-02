import { type SessionShape } from "@drizzle/schematics/session/schema";
import { ApiProperty } from "@nestjs/swagger";


export default class Sessions implements SessionShape{
    @ApiProperty({example: 1, description:"Entity identifier"})
    id!: number;

    @ApiProperty({description:"Timestamp with the created session"})
    createdAt!: Date;

    @ApiProperty({example: 2, description:"User foreign key"})
    userId!: number;

    @ApiProperty({example: "haskend2123", description:"Encrypted refresh token"})
    refreshTokenHash!: string;

    @ApiProperty({example: "Mobile", description:"Current device session connected"})
    deviceType!: string | null;

    @ApiProperty({description:"Timestamp of the token refresh expiration date"})
    expiresAt!: Date | null;

    @ApiProperty({description:"Boolean to determine wether or not the session is still active"})
    isActive!: boolean | null;

}