import { Item } from '../items/item.entity';
import { User } from '../users/user.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // resto can have many users
  @OneToMany(() => User, (user) => user.restaurant)
  users: User[];

  // resto can have many items
  @OneToMany(() => Item, (item) => item.restaurant)
  items: Item[];
}
