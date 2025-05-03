import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { Restaurant } from './entities/restaurant.entity';

@Module({
  controllers: [RestaurantsController],
  imports: [Restaurant],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
