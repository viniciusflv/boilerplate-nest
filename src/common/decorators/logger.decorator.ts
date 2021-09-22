import { applyDecorators, UseInterceptors } from '@nestjs/common';

import { LoggerInterceptor } from '../interceptors/logger.interceptor';

export const Logger = (...args: [string, string]) =>
  applyDecorators(UseInterceptors(new LoggerInterceptor(...args)));
