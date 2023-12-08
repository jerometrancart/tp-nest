import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('disconnect')
  async disconnect(@Request() req) {
    const token = req.headers.authorization.replace('Bearer ', '');
    await this.authService.logout(token);

    return { message: 'Disconnected successfully', status: HttpStatus.OK };
  }
}
