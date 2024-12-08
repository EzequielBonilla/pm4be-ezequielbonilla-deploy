import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrderDetailResponseDto } from 'src/order-details/dto/response-order-detail.dto';
import { UuidValidationPipe } from '../pipes/uuid-validation.pipe';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/shared/enums/roles.enum';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Creación de ordenes de compra',
    description:
      'Este endpoint está destinado a la creación de ordenes de compra por parte de los usuarios.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Traer todas las ordenes de compra',
    description:
      'Endpoint para traer todas las ordenes de la DB, resguardado por roles.',
  })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Traer orden de compra especifica',
    description:
      'Este endpoint permite acceder a los detalles de una otden de compra especifica a través de su ID.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(UuidValidationPipe)
  async findOne(@Param('id') id: string): Promise<OrderDetailResponseDto> {
    const order = await this.ordersService.findOne(id);
    console.log(order);
    return new OrderDetailResponseDto(order);
  }

  // @Patch(':id')
  // @UseGuards(AuthGuard)
  // @UsePipes(UuidValidationPipe)
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(id, updateOrderDto);
  // }

  // @Delete(':id')
  // @UseGuards(AuthGuard)
  // @UsePipes(UuidValidationPipe)
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(id);
  // }
}
