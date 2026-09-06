import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity.js';

@Entity('products')
export class Product {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ type: () => Category })
  @ManyToOne(() => Category, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @ApiProperty({ example: 'Wireless Mouse' })
  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @ApiPropertyOptional({ example: 'Ergonomic wireless mouse with USB receiver' })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({ example: '29.99' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: string;

  @ApiProperty({ example: 100, default: 0 })
  @Column({ type: 'int', default: 0 })
  stock!: number;

  @ApiPropertyOptional({ example: 'https://example.com/images/mouse.png' })
  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl?: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
