import { ArgumentsHost, Catch, ExceptionFilter, Inject } from '@nestjs/common';
import { Response } from 'express';
import { CommonModuleOptions } from '../../common.module';
import { getI18nContextFromArgumentsHost } from 'nestjs-i18n';
import { CustomException } from '../exceptions/custom.exception';
import { CustomLogger } from '../loggers/custom.logger';
import { MODULE_OPTION_KEY } from '../constants/common.constants';
import { IResponseError } from '../interfaces/IResponseError';

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new CustomLogger(CustomExceptionFilter.name);

  constructor(
    @Inject(MODULE_OPTION_KEY) private options: CommonModuleOptions,
  ) {}

  catch(exception: CustomException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error({
      message: exception.error.message,
      stack: exception.stack,
    });

    if (this.options.useI18nOnFilter) {
      try {
        const i18n = getI18nContextFromArgumentsHost(host);
        exception.error.message = i18n.t(exception.error.message, {
          args: exception.error.args || {},
        });
      } catch (ex) {
        this.logger.error({ message: 'Translation error', stack: ex.stack });
      }
    }

    const { statusCode, error } = exception;

    const errorBody: IResponseError = {
      error: error,
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
    };

    response.status(exception.statusCode).json(errorBody);
  }
}
