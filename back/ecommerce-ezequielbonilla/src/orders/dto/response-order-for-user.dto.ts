import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';

export class OrderResponseForUserDto {
  @ApiProperty({
    example: '123456ef-123e-123e-123e-1234567890ef',
  })
  id: string;

  @ApiProperty({
    example: '2024.12.08',
  })
  date: Date;

  constructor(order: Partial<Order>) {
    this.id = order.id;
    this.date = order.date;
  }
}
