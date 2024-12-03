import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { UuidValidationPipe } from 'src/pipes/uuid-validation.pipe';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailsService.create(createOrderDetailDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.orderDetailsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @UsePipes(UuidValidationPipe)
  findOne(@Param('id') id: string) {
    return this.orderDetailsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UsePipes(UuidValidationPipe)
  update(
    @Param('id') id: string,
    @Body() updateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    return this.orderDetailsService.update(id, updateOrderDetailDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UsePipes(UuidValidationPipe)
  remove(@Param('id') id: string) {
    return this.orderDetailsService.remove(id);
  }
}
