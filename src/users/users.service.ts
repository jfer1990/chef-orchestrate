import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';

import { DRIZZLE } from '../drizzle/drizzle.module';
import { Users } from '../drizzle/schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase) {}

  async create(createUserDto: CreateUserDto) {
    const [user] = await this.db.insert(Users).values(createUserDto).returning();
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
