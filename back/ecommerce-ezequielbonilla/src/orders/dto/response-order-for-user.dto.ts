import { Order } from '../entities/order.entity';

export class OrderResponseForUserDto {
  id: string;
  date: Date;

  constructor(order: Partial<Order>) {
    this.id = order.id;
    this.date = order.date;
  }
}
