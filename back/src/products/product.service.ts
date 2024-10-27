import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductService {
  constructor(private productsRepository: ProductsRepository) {}

  async getProducts(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit);
  }

  async getProduct(id: number) {
    return this.productsRepository.getProduct(id);
  }

  async createProduct(productData) {
    // Validar la estructura del producto
    if (!productData.name || !productData.description || !productData.price) {
      throw new Error('Estructura del producto inválida');
    }
    return this.productsRepository.createProduct(productData);
  }

  async updateProduct(id: number, productData) {
    // Validar la estructura del producto
    if (!productData.name && !productData.description && !productData.price) {
      throw new Error('Estructura del producto inválida');
    }
    return this.productsRepository.updateProduct(id, productData);
  }

  async deleteProduct(id: number) {
    return this.productsRepository.deleteProduct(id);
  }
}
