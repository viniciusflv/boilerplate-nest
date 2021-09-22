import { Observable } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';

import { loggerOperator } from '../common/operators/logger.operator';

export function logHandler<T>(
  stream: Observable<T>,
  {
    logger,
    message,
    info = {},
  }: { logger: PinoLogger; message: string; info?: Record<string, any> },
): Observable<T> {
  logger.info(info, `Começando a ${message}`);
  return stream.pipe(loggerOperator(logger, message, info));
}
