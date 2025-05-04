import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ne garde que les propriétés définies dans le DTO
      forbidNonWhitelisted: true, // Rejette les requêtes avec des propriétés non attendues
      transform: true, // Transforme le payload en instance du DTO
      transformOptions: {
        enableImplicitConversion: true, // Aide pour la conversion implicite des types primitifs
      },
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  Logger.log(`App run on :${port}`);
}

void bootstrap();
