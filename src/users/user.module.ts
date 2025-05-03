import { Module } from '@nestjs/common';
import { User } from './user.entity';

@Module({
  imports: [User],
  controllers: [],
  providers: [],
})
export class UsersModule {}
