import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}

  findAll() {
    return this.productRepository.getProducts();
  }

  findOne(string) {
    return this.productRepository.findOne(id);
  }

  create(createProductDto: CreateProductDto): Product {
    return this.productRepository.create(createProductDto);
  }

  update(string, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  remove(string) {
    return this.productRepository.deleteProduct(id);
  }
}
