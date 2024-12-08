import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { ProductId } from 'src/products/interfaces/product-id.interface';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: '654321ef-321e-321e-321e-0987654321ef',
  })
  userId: string;
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({
    example: 'products list',
  })
  products: Array<ProductId>;
}
