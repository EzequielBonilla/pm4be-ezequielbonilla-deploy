import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenv.config({
  path: '.env.development.local',
});

const PostgresDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  dropSchema: false,
  logging: false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migration/*{.ts,.js}'],
  subscribers: [],
  ssl: false,
};

export const dataSourceConfig = registerAs(
  'dataSource',
  () => PostgresDataSourceOptions,
);

export const PostgresDataSource = new DataSource(PostgresDataSourceOptions);
