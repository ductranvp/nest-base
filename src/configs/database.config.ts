import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppEnv } from '../constants/app.constant';
import { SnakeNamingStrategy } from '@node-collection/nest-ready';

export const databaseConfig: TypeOrmModuleOptions = {
  type: AppEnv.DB_TYPE as any,
  host: AppEnv.DB_HOST,
  port: +AppEnv.DB_PORT,
  database: AppEnv.DB_NAME,
  username: AppEnv.DB_USER,
  password: AppEnv.DB_PASS,
  logging: ['query'],
  synchronize: true,
  entities: ['./dist/modules/**/*.entity{.ts,.js}'],
  subscribers: ['./dist/modules/**/*.subscriber{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
};
