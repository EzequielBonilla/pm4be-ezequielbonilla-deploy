import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '../auth-old/auth.guard';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(@Query('page') page = 1, @Query('limit') limit = 5) {
    return this.productService.getProducts(page, limit);
  }

  @Get(':id')
  getProduct(@Param('id') id: number) {
    return this.productService.getProduct(id);
  }

  @Post()
  createProduct(@Body() productData) {
    return this.productService.createProduct(productData);
  }

  @Put(':id')
  updateProduct(@Param('id') id: number, @Body() productData) {
    return this.productService.updateProduct(id, productData);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
