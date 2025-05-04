// src/auth/auth.service.ts
import { Injectable, Logger } from '@nestjs/common'; // Ajoutez Logger
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // Importez bcrypt
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService, // Service pour accéder aux données utilisateur
    private jwtService: JwtService, // Service pour créer les JWT
  ) {}

  /**
   * Valide l'utilisateur en comparant le mot de passe fourni avec le hash stocké.
   * C'est cette fonction qui sera appelée par la LocalStrategy.
   */
  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    this.logger.debug(`Attempting to validate user: ${username}`);
    const user = await this.usersService.findOneByUsername(username);

    // Vérifie si l'utilisateur existe ET si le mot de passe fourni correspond au hash stocké
    if (user && user.password && (await bcrypt.compare(pass, user.password))) {
      this.logger.log(`User ${username} validated successfully.`);
      // Retourne l'objet utilisateur SANS le hash du mot de passe
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    // Si l'utilisateur n'existe pas ou le mot de passe est incorrect
    this.logger.warn(`Validation failed for user: ${username}`);
    return null; // Important de retourner null en cas d'échec de validation
  }

  /**
   * Génère un token JWT pour un utilisateur déjà validé.
   * Sera appelée par le AuthController après une validation réussie par la garde.
   */
  login(user: User) {
    // user contient ici les infos retournées par validateUser (sans le mot de passe)
    const payload = {
      username: user.username,
      sub: user.id, // 'sub' = subject (ID utilisateur standard dans JWT)
      restaurantId: user.restaurantId, // Incluez d'autres infos pertinentes
    };
    this.logger.log(
      `Generating JWT for user: ${user.username} (ID: ${user.id})`,
    );
    return {
      access_token: this.jwtService.sign(payload), // Crée et signe le token
    };
  }
}
