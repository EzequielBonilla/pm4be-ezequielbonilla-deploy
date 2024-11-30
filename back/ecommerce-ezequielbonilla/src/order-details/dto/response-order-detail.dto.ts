export class OrderDetailResponseDto {
  id: string;
  date: Date;
  userId: string;
  totalPrice: number;
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
