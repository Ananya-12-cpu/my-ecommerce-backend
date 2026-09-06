import { ApiProperty } from '@nestjs/swagger';
import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import type { Cart } from './cart.entity.js';
import { Product } from '../../products/entities/product.entity.js';

@Entity('cart_items')
@Unique('uq_cart_product', ['cart', 'product'])
@Check('chk_cart_items_quantity', `"quantity" > 0`)
export class CartItem {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne('Cart', (cart: Cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart!: Cart;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @ApiProperty({ example: 2, default: 1 })
  @Column({ type: 'int', default: 1 })
  quantity!: number;
}
