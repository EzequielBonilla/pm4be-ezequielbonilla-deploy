import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { CategoriesSeed } from './categories/categories.seed';
import { ProductsSeed } from './products/products.seed';
import { User } from 'src/users/entities/user.entity';
import { UsersSeed } from './users/users.seed';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, User])],
  providers: [CategoriesSeed, ProductsSeed, UsersSeed],
  exports: [CategoriesSeed, ProductsSeed, UsersSeed],
})
export class SeedsModule {}
