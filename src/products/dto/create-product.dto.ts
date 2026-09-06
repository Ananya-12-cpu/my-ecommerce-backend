export class CreateProductDto {
  categoryId!: number;
  name!: string;
  description?: string;
  price!: string;
  stock?: number;
  imageUrl?: string;
}
