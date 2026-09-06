import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity.js';
import { CartItem } from './entities/cart-item.entity.js';
import { Product } from '../products/entities/product.entity.js';
import { CreateCartDto } from './dto/create-cart.dto.js';
import { AddCartItemDto } from './dto/add-cart-item.dto.js';
import { UpdateCartItemDto } from './dto/update-cart-item.dto.js';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartsRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemsRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  create(dto: CreateCartDto): Promise<Cart> {
    const cart = this.cartsRepository.create(dto);
    return this.cartsRepository.save(cart);
  }

  async findOne(id: number): Promise<Cart> {
    const cart = await this.cartsRepository.findOne({
      where: { id },
      relations: { items: { product: true } },
    });
    if (!cart) {
      throw new NotFoundException(`Cart ${id} not found`);
    }
    return cart;
  }

  async findByUser(userId: number): Promise<Cart[]> {
    return this.cartsRepository.find({
      where: { userId },
      relations: { items: { product: true } },
    });
  }

  async addItem(cartId: number, dto: AddCartItemDto): Promise<Cart> {
    const cart = await this.findOne(cartId);

    const product = await this.productsRepository.findOneBy({
      id: dto.productId,
    });
    if (!product) {
      throw new NotFoundException(`Product ${dto.productId} not found`);
    }

    const quantity = dto.quantity ?? 1;
    if (quantity <= 0) {
      throw new BadRequestException('quantity must be greater than 0');
    }

    const existingItem = cart.items.find(
      (item) => item.product.id === dto.productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      await this.cartItemsRepository.save(existingItem);
    } else {
      const item = this.cartItemsRepository.create({
        cart,
        product,
        quantity,
      });
      await this.cartItemsRepository.save(item);
    }

    return this.findOne(cartId);
  }

  async updateItem(
    cartId: number,
    itemId: number,
    dto: UpdateCartItemDto,
  ): Promise<Cart> {
    if (dto.quantity <= 0) {
      throw new BadRequestException('quantity must be greater than 0');
    }

    const item = await this.cartItemsRepository.findOne({
      where: { id: itemId, cart: { id: cartId } },
    });
    if (!item) {
      throw new NotFoundException(
        `Item ${itemId} not found in cart ${cartId}`,
      );
    }

    item.quantity = dto.quantity;
    await this.cartItemsRepository.save(item);
    return this.findOne(cartId);
  }

  async removeItem(cartId: number, itemId: number): Promise<Cart> {
    const item = await this.cartItemsRepository.findOne({
      where: { id: itemId, cart: { id: cartId } },
    });
    if (!item) {
      throw new NotFoundException(
        `Item ${itemId} not found in cart ${cartId}`,
      );
    }

    await this.cartItemsRepository.delete(item.id);
    return this.findOne(cartId);
  }

  async remove(id: number): Promise<void> {
    const result = await this.cartsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cart ${id} not found`);
    }
  }
}
