import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { UsersModule } from '../users/users.module';
import { ItemsModule } from '../items/items.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    RestaurantsModule,
    UsersModule,
    ItemsModule,
    DatabaseModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
  ],
  controllers: [AppController],
  providers: [AppService, RestaurantsService],
})
export class AppModule {}
