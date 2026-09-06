import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CartService } from './cart.service.js';
import { CreateCartDto } from './dto/create-cart.dto.js';
import { AddCartItemDto } from './dto/add-cart-item.dto.js';
import { UpdateCartItemDto } from './dto/update-cart-item.dto.js';
import { Cart } from './entities/cart.entity.js';

@ApiTags('carts')
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Create a cart for a user' })
  @ApiResponse({ status: 201, type: Cart })
  create(@Body() dto: CreateCartDto) {
    return this.cartService.create(dto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: "List a user's carts" })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: [Cart] })
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cart by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Cart })
  @ApiNotFoundResponse({ description: 'Cart not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.findOne(id);
  }

  @Post(':id/items')
  @ApiOperation({
    summary: 'Add an item to the cart',
    description:
      'If the product is already in the cart, its quantity is incremented instead of creating a duplicate row.',
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 201, type: Cart })
  @ApiNotFoundResponse({ description: 'Cart or product not found' })
  @ApiBadRequestResponse({ description: 'quantity must be greater than 0' })
  addItem(@Param('id', ParseIntPipe) id: number, @Body() dto: AddCartItemDto) {
    return this.cartService.addItem(id, dto);
  }

  @Patch(':id/items/:itemId')
  @ApiOperation({ summary: 'Update the quantity of a cart item' })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'itemId', type: Number })
  @ApiResponse({ status: 200, type: Cart })
  @ApiNotFoundResponse({ description: 'Cart or item not found' })
  @ApiBadRequestResponse({ description: 'quantity must be greater than 0' })
  updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(id, itemId, dto);
  }

  @Delete(':id/items/:itemId')
  @ApiOperation({ summary: 'Remove an item from the cart' })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'itemId', type: Number })
  @ApiResponse({ status: 200, type: Cart })
  @ApiNotFoundResponse({ description: 'Cart or item not found' })
  removeItem(
    @Param('id', ParseIntPipe) id: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.cartService.removeItem(id, itemId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cart' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Cart deleted' })
  @ApiNotFoundResponse({ description: 'Cart not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.remove(id);
  }
}
