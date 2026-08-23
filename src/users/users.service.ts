import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs'; 


import { DRIZZLE } from '../drizzle/drizzle.module';
import { users } from '../drizzle/users/schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase) {}

  async create(createUserDto: CreateUserDto):Promise<User> {
      
        const userExists = await this.findByEmail(createUserDto.email); 
        if(userExists){
          throw new ConflictException("This email is already registered in our system, try with another email to register a new account"); 
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password,10);         
        const [user] = await this.db.insert(users).values({
          ...createUserDto, 
          password:hashedPassword
        }).returning();
        return user;
  }

  async findByEmail(email:string){
    const [user] = await this.db.select().from(users).where(eq(users.email, email)).limit(1); 
    if(!user) return null; 
    return user; 
  }

  async findAll() {
    return this.db.select().from(users);
  }

  async findOneById(id: number) {
    const [user] = await this.db.select().from(users).where(eq(users.id, id)).limit(1);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const [user] = await this.db
      .update(users)
      .set({ ...updateUserDto, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async remove(id: number) {
    const [user] = await this.db.delete(users).where(eq(users.id, id)).returning();

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }
}
