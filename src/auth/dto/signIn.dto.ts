import { type UserSchema } from "@drizzle/users/schema";


export class SignInDto implements Omit<UserSchema, 'id'|'name'|'createdAt'|'updatedAt' >{
    email!: string;
    password!: string;
}

