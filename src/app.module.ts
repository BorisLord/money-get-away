import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RestaurantsService } from './restaurants/restaurants.service';

@Module({
  imports: [
    RestaurantsModule,
    UsersModule,
    ItemsModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
  ],
  controllers: [AppController],
  providers: [AppService, RestaurantsService],
})
export class AppModule {}
