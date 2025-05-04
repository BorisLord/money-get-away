// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard'; // Importez la garde locale
import { LoginDto } from './dto/login.dto'; // Importez le DTO

@Controller('auth') // Préfixe de route /auth
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  // Route POST /auth/login
  @UseGuards(LocalAuthGuard) // Applique la garde ici ! C'est elle qui fait les vérifications via LocalStrategy
  @Post('login')
  @HttpCode(HttpStatus.OK) // Code HTTP 200 si succès
  login(@Request() req, @Body() loginDto: LoginDto) {
    // Valide le corps avec LoginDto
    this.logger.log(`Login attempt successful for user: ${req.user.username}`);
    // Si la garde LocalAuthGuard passe (càd LocalStrategy.validate a retourné un user),
    // alors req.user contient l'objet utilisateur validé.
    // La garde a déjà fait les vérifications !
    // On appelle maintenant seulement la partie "login" de AuthService pour générer le token.
    return this.authService.login(req.user);
  }
}
