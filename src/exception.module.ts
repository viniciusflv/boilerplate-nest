import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { GenericExceptionFilter } from './common/filters/generic-exception.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: GenericExceptionFilter,
    },
  ],
})
export class ExceptionModule {}
