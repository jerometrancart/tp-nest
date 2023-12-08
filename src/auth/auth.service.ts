import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '../../prisma/src/prisma/client';
import prisma from '../utils/database';

@Injectable()
export class AuthService {
  private readonly jwtBlacklist: Set<string> = new Set();
  private readonly passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!?$*]).{8,}$/;

  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(token: string): Promise<void> {
    this.jwtBlacklist.add(token);
  }

  async validateUser(username: string, password: string): Promise<any> {
    // Vérifie si le mot de passe correspond à la regex définie
    if (!this.passwordRegex.test(password)) {
      throw new UnauthorizedException('Invalid password format');
    }

    const user = await prisma.user.findFirst({
      where: { username: username },
    });

    if (user && user.password === password) {
      return { userId: user.id, username: user.username };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async register(userInput: Prisma.UserCreateInput): Promise<any> {
    // Logique d'inscription de l'utilisateur dans la base de données (exemple avec Prisma)
    const createdUser = await prisma.user.create({
      data: userInput,
    });

    return { userId: createdUser.id, username: createdUser.username };
  }
}
