import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../prisma/src/prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(+id);
  }

  @Post()
  createUser(@Body() userData: any): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userData: any): Promise<User> {
    return this.userService.updateUser(+id, userData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(+id);
  }
}
