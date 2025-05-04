// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; // Pour UsersService
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'; // Pour JwtService dans AuthService
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy'; // Notre stratégie locale
import { AuthController } from './auth.controller';
// Importez JwtStrategy si vous l'avez déjà créé, sinon on l'ajoutera plus tard
// import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // Enregistre Passport, on mettra jwt par défaut plus tard
    JwtModule.registerAsync({
      // Requis car AuthService injecte JwtService
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
        },
      }),
    }),
    ConfigModule,
  ],
  providers: [
    AuthService,
    LocalStrategy, // Déclare la stratégie pour que Passport la trouve
    // JwtStrategy, // Ajoutez JwtStrategy ici quand vous la créerez
  ],
  controllers: [AuthController],
})
export class AuthModule {}
