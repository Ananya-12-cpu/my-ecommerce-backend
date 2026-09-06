import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ example: 1, description: 'Id of the product to order' })
  productId!: number;

  @ApiPropertyOptional({ example: 1, default: 1, description: 'Quantity to order' })
  quantity?: number;
}
