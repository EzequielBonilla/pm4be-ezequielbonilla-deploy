import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { CategoriesSeed } from './seeds/categories/categories.seed';
import { ProductsSeed } from './seeds/products/products.seed';
import { ValidationPipe } from '@nestjs/common';
import { UsersSeed } from './seeds/users/users.seed';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PM4BE - Ezequiel Bonilla')
    .setDescription(
      'Proyecto integrador del Modulo 4 -BackEnd- API Dockerizada de Ecommerce',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const dataSource = app.get(DataSource);
  const databaseName = 'pm4be_ecommerce';
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.connect();

    const result = await queryRunner.query(`
      SELECT 1 FROM pg_database WHERE datname = '${databaseName}'
    `);

    if (result.length === 0) {
      console.log(`La base de datos ${databaseName} no existe. Creándola...`);
      await queryRunner.query(`CREATE DATABASE ${databaseName}`);
      console.log(`Base de datos ${databaseName} creada.`);
    }

    await dataSource.setOptions({
      database: databaseName,
    });

    console.log(`Conectando a la base de datos ${databaseName}...`);

    await dataSource.initialize();
    await dataSource.runMigrations();
    console.log('Migraciones ejecutadas con éxito');
  } catch (error) {
    console.error('Error al conectar o crear la base de datos', error);
  } finally {
    await queryRunner.release();
  }

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
