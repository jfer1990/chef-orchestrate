import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { type CreateUserDto } from './dto/create-user.dto';
import { type UpdateUserDto } from './dto/update-user.dto';
import { CreateUserRequest } from './dto/create-user.request';
import { User } from './entities/user.entity';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: User, description: 'The user was created successfully' })
  create(@Body() createUserDto: CreateUserRequest): Promise<User>  {
    return this.usersService.create(createUserDto as CreateUserDto);
  } 

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
