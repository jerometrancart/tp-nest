import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../prisma/src/prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
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
    // Validation des données requises
    if (!userData.username || !userData.password) {
      throw new HttpException(
        'Username and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

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
