import { ApiProperty } from '@nestjs/swagger';
import { UserSchema } from '@drizzle/users/schema';

export class User implements UserSchema{
    @ApiProperty({ example: 1, description: 'User ID' })
    id!: number;

    @ApiProperty({ example: 'Dr. Seus', description: 'User full name' })
    name!: string;

    @ApiProperty({ example: 'dr_seus@example.com', description: 'User email address' })
    email!: string;

    @ApiProperty({ description: "User's password hashed" })
    password!: string;

    @ApiProperty({ description: 'Account creation timestamp' })
    createdAt!: Date;

    @ApiProperty({ description: 'Last update timestamp' })
    updatedAt!: Date;
}
