import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 1, description: 'Id of the category this product belongs to' })
  categoryId!: number;

  @ApiProperty({ example: 'Wireless Mouse' })
  name!: string;

  @ApiPropertyOptional({ example: 'Ergonomic wireless mouse with USB receiver' })
  description?: string;

  @ApiProperty({ example: '29.99' })
  price!: string;

  @ApiPropertyOptional({ example: 100, default: 0 })
  stock?: number;

  @ApiPropertyOptional({ example: 'https://example.com/images/mouse.png' })
  imageUrl?: string;
}
