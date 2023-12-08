import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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

    if (username === 'john.doe' && password === 'Password1$') {
      return { userId: 1, username: 'john.doe' };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
