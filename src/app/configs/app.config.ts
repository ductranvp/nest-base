import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from '../../common/shared/interceptors/transform.interceptor';

export function initAppConfig(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();
}
