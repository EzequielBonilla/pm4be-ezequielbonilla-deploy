import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsRepository {
  private products = [
    {
      id: 1,
      name: 'lata',
      description: 'Lata de refresco',
      price: 1.5,
      stock: true,
      imgUrl: 'url_to_image_lata',
    },
    {
      id: 2,
      name: 'fideos',
      description: 'Paquete de fideos',
      price: 2.0,
      stock: true,
      imgUrl: 'url_to_image_fideos',
    },
    {
      id: 3,
      name: 'yerba',
      description: 'Paquete de yerba mate',
      price: 3.0,
      stock: true,
      imgUrl: 'url_to_image_yerba',
    },
  ];

  async getProducts(page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    return this.products.slice(startIndex, startIndex + limit);
  }

  async getProduct(id: number) {
    return this.products.find((product) => product.id === id);
  }

  async createProduct(productData) {
    const newProduct = { id: this.products.length + 1, ...productData };
    this.products.push(newProduct);
    return newProduct.id;
  }

  async updateProduct(id: number, productData) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...productData };
      return id;
    }
    return null; //manejar error a futuro
  }

  async deleteProduct(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return id;
    }
    return null; //manejar error a futuro
  }
}
