import { ApiProperty } from '@nestjs/swagger';
import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Order } from './order.entity.js';
import { Product } from '../../products/entities/product.entity.js';

@Entity('order_items')
@Check('chk_order_items_quantity', `"quantity" > 0`)
@Check('chk_order_items_price', `"price" >= 0`)
export class OrderItem {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne('Order', (order: Order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @ApiProperty({ example: 2 })
  @Column({ type: 'int' })
  quantity!: number;

  @ApiProperty({ example: '29.99', description: 'Unit price at the time of purchase' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: string;
}
