import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs'; 


import { DRIZZLE } from '../drizzle/drizzle.module';
import { Users } from '../drizzle/users/schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {type UserSchema} from '../drizzle/users/schema'; 
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase<UserSchema>) {}

  async create(createUserDto: CreateUserDto):Promise<User> {
      
        const userExists = await this.findByEmail(createUserDto.email); 
        if(userExists){
          throw new ConflictException("This email is already registered in our system, try with another email to register a new account"); 
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password,10); 
        const [user] = await this.db.insert(Users).values({
          ...createUserDto, 
          password:hashedPassword
        }).returning();
        return user;
  }

  async findByEmail(email:string){
    const [user] = await this.db.select().from(Users).where(eq(Users.email, email)).limit(1); 
    if(!user) return null; 
    return user; 
  }

  async findAll() {
    return this.db.select().from(Users);
  }

  async findOne(id: number) {
    const [user] = await this.db.select().from(Users).where(eq(Users.id, id)).limit(1);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const [user] = await this.db
      .update(Users)
      .set({ ...updateUserDto, updatedAt: new Date() })
      .where(eq(Users.id, id))
      .returning();

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async remove(id: number) {
    const [user] = await this.db.delete(Users).where(eq(Users.id, id)).returning();

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }
}
