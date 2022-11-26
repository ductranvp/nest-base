import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './configs/database.config';
import { NestReadyModule } from '@node-collection/nest-ready';
import { ErrorMessage } from './constants/error.constant';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    NestReadyModule.register({
      errorMessages: {
        internalErrorMessage: ErrorMessage.INTERNAL_SERVER_ERROR,
      },
    }),
  ],
})
export class AppModule {}
