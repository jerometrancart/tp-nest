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

  @Post('register')
  async register(@Request() req) {
    const { username, password } = req.body;
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      // Si la validation échoue, vous pouvez retourner un message d'erreur approprié
      return {
        message: 'Invalid credentials for registration',
        status: HttpStatus.UNAUTHORIZED,
      };
    }

    // Logique pour créer l'utilisateur dans la base de données, par exemple avec Prisma
    // Assurez-vous d'ajuster cela selon votre modèle et vos besoins spécifiques
    const createdUser = await prisma.user.create({
      data: {
        username: user.username,
        password: user.password, // Assurez-vous d'ajuster cela selon votre modèle
      },
    });

    return {
      message: 'Registration successful',
      user: createdUser,
      status: HttpStatus.CREATED,
    };
  }
}
