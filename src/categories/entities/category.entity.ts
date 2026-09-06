import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Electronics' })
  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @ApiPropertyOptional({ example: 'Devices, gadgets and accessories' })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
