import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics' })
  name!: string;

  @ApiPropertyOptional({ example: 'Devices, gadgets and accessories' })
  description?: string;
}
