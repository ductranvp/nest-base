import { DynamicModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { ForwardReference } from '@nestjs/common/interfaces/modules/forward-reference.interface';
import { MODULE_OPTION_KEY } from './shared/constants/common.constants';
import { CustomExceptionFilter } from './shared/filters/custom-exception.filter';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';

interface ErrorMessages {
  internalErrorMessage?: string;
}

export interface CommonModuleOptions {
  useCustomFilter?: boolean;
  useGlobalFilter?: boolean;
  useI18nOnFilter?: boolean;
  errorMessages?: ErrorMessages;
}

const defaultOptions: CommonModuleOptions = {
  useCustomFilter: true,
  useGlobalFilter: true,
  useI18nOnFilter: true,
  errorMessages: {
    internalErrorMessage: 'Internal Server Error',
  },
};

export class CommonModule {
  static register(options?: CommonModuleOptions): DynamicModule {
    const mergedOptions: CommonModuleOptions = {
      ...defaultOptions,
      ...options,
      errorMessages: {
        ...defaultOptions.errorMessages,
        ...options?.errorMessages,
      },
    };

    /* Providers */
    const providers: Provider[] = [
      {
        provide: MODULE_OPTION_KEY,
        useValue: mergedOptions,
      },
    ];

    if (mergedOptions.useCustomFilter) {
      providers.push({ provide: APP_FILTER, useClass: CustomExceptionFilter });
    }

    if (mergedOptions.useGlobalFilter) {
      providers.unshift({
        provide: APP_FILTER,
        useClass: GlobalExceptionFilter,
      });
    }

    /* Imports */
    const imports: Array<
      Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
    > = [];

    return {
      imports: imports,
      providers: providers,
      module: CommonModule,
    };
  }
}
