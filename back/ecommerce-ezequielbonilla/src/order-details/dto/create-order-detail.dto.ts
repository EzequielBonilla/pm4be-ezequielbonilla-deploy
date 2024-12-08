import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDetailDto {
  @ApiProperty({
    example: '800.16',
  })
  price: number;

  @ApiProperty({
    example: 'orders list',
  })
  order: object;

  @ApiProperty({
    example: 'products list',
  })
  products: Array<object>;
}
