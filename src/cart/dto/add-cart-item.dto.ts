import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddCartItemDto {
  @ApiProperty({ example: 1, description: 'Id of the product to add' })
  productId!: number;

  @ApiPropertyOptional({ example: 1, default: 1, description: 'Quantity to add' })
  quantity?: number;
}
