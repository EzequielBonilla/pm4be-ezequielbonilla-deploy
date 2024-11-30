import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { OrderDetailsService } from 'src/order-details/order-details.service';
import { CreateOrderDetailDto } from 'src/order-details/dto/create-order-detail.dto';
import { ProductId } from 'src/products/interfaces/product-id.interface';
import { OrderResponseDto } from './dto/response-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UsersService,
    private readonly productService: ProductsService,
    private readonly orderDetailsService: OrderDetailsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;

    const user = await this.userService.findOne(userId);

    const order = { user: user, date: new Date() };

    const orderEntity = await this.orderRepository.save(
      this.orderRepository.create(order),
    );

    const total = await this.calculateTotal(products);

    const orderDetail = new CreateOrderDetailDto();
    orderDetail.price = total;
    orderDetail.products = products;
    orderDetail.order = orderEntity;

    const orderDetailEntity =
      await this.orderDetailsService.create(orderDetail);

    return new OrderResponseDto(orderDetailEntity);
  }

  private async calculateTotal(products: Array<ProductId>): Promise<number> {
    let total = 0;
    for (const product of products) {
      total += await this.productService.buyProduct(product.id);
    }
    return total;
  }

  findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOneBy({ id });
    const orderDetail = await this.orderDetailsService.findOneByOrderId(
      order.id,
      ['products', 'order'],
    );
    return orderDetail;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
