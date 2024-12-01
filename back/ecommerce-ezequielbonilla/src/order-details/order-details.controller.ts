import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { UuidValidationPipe } from 'src/pipes/uuid-validation.pipe';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailsService.create(createOrderDetailDto);
  }

  @Get()
  findAll() {
    return this.orderDetailsService.findAll();
  }

  @Get(':id')
  @UsePipes(UuidValidationPipe)
  findOne(@Param('id') id: string) {
    return this.orderDetailsService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(UuidValidationPipe)
  update(
    @Param('id') id: string,
    @Body() updateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    return this.orderDetailsService.update(id, updateOrderDetailDto);
  }

  @Delete(':id')
  @UsePipes(UuidValidationPipe)
  remove(@Param('id') id: string) {
    return this.orderDetailsService.remove(id);
  }
}
