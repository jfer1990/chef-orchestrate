import { IsEmail, IsStrongPassword, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
export class CreateUserRequest implements CreateUserDto{
  @ApiProperty({ example: 'Chef Orchestrate', description: 'User full name' })
  @IsString()
  @MinLength(5)
  name!:string; 
 
  @ApiProperty({ example: 'chef@example.com', description: 'User email address' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'StrongPassword123!', description: 'User password' })
  @IsStrongPassword()
  password!: string;

}
