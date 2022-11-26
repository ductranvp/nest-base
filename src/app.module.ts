import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './configs/database.config';
import { LoggerMiddleware, NestReadyModule } from '@node-collection/nest-ready';
import { ErrorMessage } from './constants/error.constant';
import { AccountModule } from './modules/account/account.module';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    NestReadyModule.register({
      errorMessages: {
        internalErrorMessage: ErrorMessage.INTERNAL_SERVER_ERROR,
      },
    }),
    SharedModule,
    AccountModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
