import { Module } from '@nestjs/common';
import { Item } from './item.entity';

@Module({
  imports: [Item],
  controllers: [],
  providers: [],
})
export class ItemsModule {}
