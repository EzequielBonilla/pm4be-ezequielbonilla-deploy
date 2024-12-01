import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { ProductId } from 'src/products/interfaces/product-id.interface';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;
  @IsArray()
  @ArrayMinSize(1)
  products: Array<ProductId>;
}
