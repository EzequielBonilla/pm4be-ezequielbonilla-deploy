import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { CategoriesSeed } from './seeds/categories/categories.seed';
import { ProductsSeed } from './seeds/products/products.seed';
import { ValidationPipe } from '@nestjs/common';
import { UsersSeed } from './seeds/users/users.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);

  const categoriesSeed = app.get(CategoriesSeed);
  await categoriesSeed.seed();
  console.log('categories seeded');

  const productsSeed = app.get(ProductsSeed);
  await productsSeed.seed();
  console.log('products seeded');

  const usersSeed = app.get(UsersSeed);
  await usersSeed.seed();
  console.log('users seeded');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
