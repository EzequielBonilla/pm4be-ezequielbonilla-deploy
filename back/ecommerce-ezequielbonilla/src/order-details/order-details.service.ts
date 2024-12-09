import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async findOneByOrderId(
    orderId: string,
    relations: string[] = [],
  ): Promise<OrderDetail> {
    return await this.orderDetailRepository.findOne({
      where: { order: { id: orderId } },
      relations: relations,
    });
  }

  async create(
    createOrderDetailDto: CreateOrderDetailDto,
  ): Promise<OrderDetail> {
    const orderDetail = this.orderDetailRepository.create(createOrderDetailDto);
    return await this.orderDetailRepository.save(orderDetail);
  }

  findOne(id: string) {
    return `This action returns a #${id} orderDetail`;
  }

  // async findAll(): Promise<OrderDetail[]> {
  //   return await this.orderDetailRepository.find();
  // }

  // update(id: string, updateOrderDetailDto: UpdateOrderDetailDto) {
  //   return `This action updates a #${id} orderDetail`;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} orderDetail`;
  // }
}
