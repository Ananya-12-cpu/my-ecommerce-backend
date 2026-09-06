import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity.js';
import { OrderItem } from './entities/order-item.entity.js';
import { Product } from '../products/entities/product.entity.js';
import { CreateOrderDto } from './dto/create-order.dto.js';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('order must contain at least one item');
    }

    const orderId = await this.dataSource.transaction(async (manager) => {
      const productsRepository = manager.getRepository(Product);
      const orderItems: OrderItem[] = [];
      let total = 0;

      for (const itemDto of dto.items) {
        const quantity = itemDto.quantity ?? 1;
        if (quantity <= 0) {
          throw new BadRequestException('quantity must be greater than 0');
        }

        const product = await productsRepository.findOneBy({
          id: itemDto.productId,
        });
        if (!product) {
          throw new NotFoundException(`Product ${itemDto.productId} not found`);
        }
        if (product.stock < quantity) {
          throw new BadRequestException(
            `Insufficient stock for product ${product.id}`,
          );
        }

        product.stock -= quantity;
        await productsRepository.save(product);

        const orderItem = manager.getRepository(OrderItem).create({
          product,
          quantity,
          price: product.price,
        });
        orderItems.push(orderItem);
        total += Number(product.price) * quantity;
      }

      const order = manager.getRepository(Order).create({
        userId: dto.userId,
        total: total.toFixed(2),
        items: orderItems,
      });
      const saved = await manager.getRepository(Order).save(order);
      return saved.id;
    });

    return this.findOne(orderId);
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: { items: { product: true } },
    });
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    return order;
  }

  async findByUser(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { userId },
      relations: { items: { product: true } },
      order: { createdAt: 'DESC' },
    });
  }
}
