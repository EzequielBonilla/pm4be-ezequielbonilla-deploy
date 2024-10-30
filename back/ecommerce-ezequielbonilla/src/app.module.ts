import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users-old/users.module';
import { AuthModule } from './auth-old/auth.module';
import { ProductModule } from './products-old/product.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule, ProductModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
