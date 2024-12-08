import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UuidValidationPipe } from 'src/pipes/uuid-validation.pipe';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailsService.create(createOrderDetailDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(UuidValidationPipe)
  findOne(@Param('id') id: string) {
    return this.orderDetailsService.findOne(id);
  }

  // @Get()
  // @UseGuards(AuthGuard)
  // findAll() {
  //   return this.orderDetailsService.findAll();
  // }

  // @Patch(':id')
  // @UseGuards(AuthGuard)
  // @UsePipes(UuidValidationPipe)
  // update(
  //   @Param('id') id: string,
  //   @Body() updateOrderDetailDto: UpdateOrderDetailDto,
  // ) {
  //   return this.orderDetailsService.update(id, updateOrderDetailDto);
  // }

  // @Delete(':id')
  // @UseGuards(AuthGuard)
  // @UsePipes(UuidValidationPipe)
  // remove(@Param('id') id: string) {
  //   return this.orderDetailsService.remove(id);
  // }
}
