import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item } from './entities/item.entity';

@Module({
  imports: [Item],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
