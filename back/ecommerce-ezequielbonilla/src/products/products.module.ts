import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), FileUploadModule],
  controllers: [ProductsController],
  providers: [ProductsService, FileUploadService, CloudinaryService],
  exports: [ProductsService],
})
export class ProductsModule {}
