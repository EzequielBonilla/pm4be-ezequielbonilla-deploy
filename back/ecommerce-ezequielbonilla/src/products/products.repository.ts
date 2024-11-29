import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [
    {
      id: 1,
      name: 'lata',
      description: 'Lata de refresco',
      price: 1.5,
      stock: true,
      imgUrl: 'http://url_to_image_lata.com',
    },
    {
      id: 2,
      name: 'fideos',
      description: 'Paquete de fideos',
      price: 2.0,
      stock: true,
      imgUrl: 'http://url_to_image_fideos.com',
    },
    {
      id: 3,
      name: 'yerba',
      description: 'Paquete de yerba mate',
      price: 3.0,
      stock: true,
      imgUrl: 'http://url_to_image_yerba.com',
    },
  ];

  getProducts() {
    return this.products;
  }

  findOne(string) {
    return this.products.find((product) => product.id === id);
  }

  create(createProductDto: CreateProductDto): Product {
    const newProduct = { id: this.products.length + 1, ...createProductDto };
    this.products.push(newProduct);
    return newProduct;
  }

  update(string, updateProductDto: UpdateProductDto) {
    const product = this.findOne(id);
    const updatedProduct = { ...product, ...updateProductDto };
    this.products = this.products.map((product) =>
      product.id === id ? updatedProduct : product,
    );
    return updatedProduct;
  }

  deleteProduct(string) {
    this.products = this.products.filter((product) => product.id !== id);
    return id;
  }

  // async getProducts(page: number, limit: number) {
  //   const startIndex = (page - 1) * limit;
  //   return this.products.slice(startIndex, startIndex + limit);
  // }

  // async getProduct(string) {
  //   return this.products.find((product) => product.id === id);
  // }

  // async createProduct(productData) {
  //   const newProduct = { id: this.products.length + 1, ...productData };
  //   this.products.push(newProduct);
  //   return newProduct.id;
  // }

  // async updateProduct(string, productData) {
  //   const index = this.products.findIndex((product) => product.id === id);
  //   if (index !== -1) {
  //     this.products[index] = { ...this.products[index], ...productData };
  //     return id;
  //   }
  //   return null; //manejar error a futuro
  // }

  // async deleteProduct(string) {
  //   const index = this.products.findIndex((product) => product.id === id);
  //   if (index !== -1) {
  //     this.products.splice(index, 1);
  //     return id;
  //   }
  //   return null; //manejar error a futuro
  // }
}
