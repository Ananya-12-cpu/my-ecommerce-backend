import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity.js';

@Entity('orders')
export class Order {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 1 })
  @Column({ name: 'user_id', type: 'int' })
  userId!: number;

  @ApiProperty({ example: '59.98' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total!: string;

  @ApiProperty({ type: () => OrderItem, isArray: true })
  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items!: OrderItem[];

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
