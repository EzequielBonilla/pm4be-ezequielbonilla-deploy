import { IsArray, IsString } from 'class-validator';
import { ProductId } from 'src/products/interfaces/product-id.interface';

export class CreateOrderDto {
  @IsString()
  userId: string;
  @IsArray()
  products: Array<ProductId>;
}
