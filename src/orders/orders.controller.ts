import { Controller, Get, Param, ParseIntPipe, Post, Body } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { Order } from './entities/order.entity.js';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Place an order',
    description:
      'Validates stock for each item, snapshots the current product price, decrements stock, and computes the order total.',
  })
  @ApiResponse({ status: 201, type: Order })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @ApiBadRequestResponse({
    description: 'Empty item list, invalid quantity, or insufficient stock',
  })
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: "List a user's orders" })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: [Order] })
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.ordersService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Order })
  @ApiNotFoundResponse({ description: 'Order not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }
}
