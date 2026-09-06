import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'Electronics' })
  name?: string;

  @ApiPropertyOptional({ example: 'Devices, gadgets and accessories' })
  description?: string;
}
