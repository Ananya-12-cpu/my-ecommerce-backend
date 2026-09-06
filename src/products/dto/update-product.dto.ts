import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 1, description: 'Id of the category this product belongs to' })
  categoryId?: number;

  @ApiPropertyOptional({ example: 'Wireless Mouse' })
  name?: string;

  @ApiPropertyOptional({ example: 'Ergonomic wireless mouse with USB receiver' })
  description?: string;

  @ApiPropertyOptional({ example: '29.99' })
  price?: string;

  @ApiPropertyOptional({ example: 100 })
  stock?: number;

  @ApiPropertyOptional({ example: 'https://example.com/images/mouse.png' })
  imageUrl?: string;
}
