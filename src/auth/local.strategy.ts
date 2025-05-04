// src/auth/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
// L'import de User n'est pas strictement nécessaire ici si AuthService.validateUser retourne 'any' ou un type Omit<User,...>
// import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  private readonly logger = new Logger(LocalStrategy.name);
  // private user: User; // <-- Suppression de cette propriété

  constructor(private authService: AuthService) {
    super({ usernameField: 'username', passwordField: 'password' });
  }

  async validate(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    this.logger.debug(`LocalStrategy invoked for user: ${username}`);
    // Appel et stockage dans une variable locale, ou retour direct
    const user = await this.authService.validateUser(username, password); // <- Stockage local
    if (!user) {
      // <- Utilisation de la variable locale
      // Si validateUser retourne null, on lance une exception standard
      throw new UnauthorizedException('Identifiants invalides.');
    }
    // Si succès, on retourne l'objet user (sans mot de passe)
    // Passport l'attachera à request.user
    return user; // <- Utilisation de la variable locale
  }
}
