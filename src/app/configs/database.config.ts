import { MongooseModuleOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';
import { AppEnv } from '../constants/app.constant';

export const databaseConfig: MongooseModuleOptions = {
  auth: {
    username: AppEnv.DB_USER,
    password: AppEnv.DB_PASS,
  },
  dbName: AppEnv.DB_NAME,
};
