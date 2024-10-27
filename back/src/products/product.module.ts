import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, ProductsRepository],
})
export class ProductModule {}
