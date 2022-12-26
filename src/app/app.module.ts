import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ErrorMessage } from './constants/error.constant';
import { SharedModule } from '../modules/shared/shared.module';
import { AppEnv } from './constants/app.constant';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './configs/database.config';
import { CommonModule } from '../common/common.module';
import { LoggerMiddleware } from '../common/shared/middlewares/logger.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(AppEnv.DB_URI, databaseConfig),
    CommonModule.register({
      errorMessages: {
        internalErrorMessage: ErrorMessage.INTERNAL_SERVER_ERROR,
      },
    }),
    SharedModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
