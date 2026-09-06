import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItem } from './cart-item.entity.js';

@Entity('carts')
export class Cart {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 1 })
  @Column({ name: 'user_id', type: 'int' })
  userId!: number;

  @ApiProperty({ type: () => CartItem, isArray: true })
  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true })
  items!: CartItem[];

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
