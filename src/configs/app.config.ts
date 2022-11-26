import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from '@node-collection/nest-ready';

export function initAppConfig(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();
}
