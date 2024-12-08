import { ApiProperty } from '@nestjs/swagger';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';

export class OrderResponseDto {
  @ApiProperty({
    example: '123456ef-123e-123e-123e-1234567890ef',
    description: 'this is the order-detail id',
  })
  id: string;

  @ApiProperty({
    example: '200.99',
  })
  price: number;

  @ApiProperty({
    example: 'products list',
  })
  products: object[];

  @ApiProperty({
    example: '1:1 order data',
  })
  order: {
    id: string;
    date: Date;
    user: {
      id: string;
    };
  };

  constructor(orderDetail: OrderDetail) {
    this.id = orderDetail.id;
    this.price = orderDetail.price;
    this.products = orderDetail.products;
    this.order = {
      id: orderDetail.order.id,
      date: orderDetail.order.date,
      user: {
        id: orderDetail.order.user.id,
      },
    };
  }
}
