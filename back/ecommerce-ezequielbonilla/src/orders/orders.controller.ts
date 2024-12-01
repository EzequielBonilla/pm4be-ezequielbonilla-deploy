import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderDetailResponseDto } from 'src/order-details/dto/response-order-detail.dto';
import { UuidValidationPipe } from '../pipes/uuid-validation.pipe';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(UuidValidationPipe)
  async findOne(@Param('id') id: string): Promise<OrderDetailResponseDto> {
    const order = await this.ordersService.findOne(id);
    console.log(order);
    return new OrderDetailResponseDto(order);
  }

  @Patch(':id')
  @UsePipes(UuidValidationPipe)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @UsePipes(UuidValidationPipe)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
