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
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne('Cart', (cart: Cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart!: Cart;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column({ type: 'int', default: 1 })
  quantity!: number;
}
