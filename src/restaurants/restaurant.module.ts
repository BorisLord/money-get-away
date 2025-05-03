import { Module } from '@nestjs/common';
import { Restaurant } from './restaurant.entity';
// Importez Service et Controller quand ils seront créés

@Module({
  imports: [Restaurant],
  controllers: [],
  providers: [],
})
export class RestaurantsModule {}
