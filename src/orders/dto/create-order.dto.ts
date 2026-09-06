import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderItemDto } from './create-order-item.dto.js';

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: 'Id of the user placing the order' })
  userId!: number;

  @ApiProperty({ type: () => CreateOrderItemDto, isArray: true })
  items!: CreateOrderItemDto[];
}
