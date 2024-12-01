import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { UploadFileDto } from 'src/file-upload/dto/upload-file.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async buyProduct(id: string): Promise<number> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product || product.stock === 0) {
      throw new Error('Out of stock');
    }
    product.stock -= 1;
    await this.productRepository.save(product);
    console.log('Product purchased');
    return Number(product.price);
  }

  async uploadFile(file: UploadFileDto, id: string) {
    const url = await this.fileUploadService.uploadFile({
      fieldname: file.fieldname,
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    });
    await this.productRepository.update(id, { imgUrl: url });
    return { imgUrl: url };
  }
}
