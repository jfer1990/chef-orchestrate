import { IsEmail, IsStrongPassword, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
export class CreateUserRequest implements CreateUserDto{
  @IsString()
  @MinLength(5)
  name!:string; 
 
  @IsEmail()
  email!: string;

  @IsStrongPassword()
  password!: string;

}
