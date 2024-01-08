import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../utils/database';
import { Prisma, User } from '../../prisma/src/prisma/client';

@Injectable()
export class UserService {
  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async createUser(userData: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data: userData,
    });
  }

  async updateUser(
    id: number,
    userData: Prisma.UserUpdateInput,
  ): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async deleteUser(id: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return prisma.user.delete({
      where: { id },
    });
  }
}
