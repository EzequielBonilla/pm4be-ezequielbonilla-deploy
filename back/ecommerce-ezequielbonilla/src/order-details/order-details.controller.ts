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
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear de talle de orden de compra',
    description:
      'Este endpoint crea el detalle de una orden, con el listado de productos y su precio final.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailsService.create(createOrderDetailDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Traer detalle de orden especifica',
    description:
      'Con este endpoint podemos acceder a un detalle de orden especifico.',
  })
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
