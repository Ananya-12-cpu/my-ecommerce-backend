import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty({ example: 1, description: 'Id of the user this cart belongs to' })
  userId!: number;
}
