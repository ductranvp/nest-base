import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getWinstonLoggerService } from '@node-collection/nest-ready';
import { initAppConfig } from './configs/app.config';
import { AppEnv } from './constants/app.constant';
import { setupSwagger } from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getWinstonLoggerService({
      pretty: true,
    }),
  });
  initAppConfig(app);
  setupSwagger(app);
  await app.listen(AppEnv.APP_PORT);
}
bootstrap();
