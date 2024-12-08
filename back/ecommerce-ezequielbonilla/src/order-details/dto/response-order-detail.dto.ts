import { ApiProperty } from '@nestjs/swagger';

export class OrderDetailResponseDto {
  @ApiProperty({
    example: '123456ef-123e-123e-123e-1234567890ef',
  })
  id: string;

  @ApiProperty({
    example: '2024.12.08',
  })
  date: Date;

  @ApiProperty({
    example: '654321ef-321e-321e-321e-0987654321ef',
  })
  userId: string;

  @ApiProperty({
    example: '999.99',
  })
  totalPrice: number;

  @ApiProperty({
    example: 'products list',
  })
  productIds: string[];

  constructor(order: any) {
    this.id = order.id;
    this.date = order.date;
    this.userId = order.user?.id;
    this.totalPrice = order.orderDetails?.price || 0;
    this.productIds =
      order.orderDetails?.products?.map((product) => product.id) || [];
  }
}
