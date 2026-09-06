import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartItemDto {
  @ApiProperty({ example: 2, description: 'New quantity for the cart item' })
  quantity!: number;
}
