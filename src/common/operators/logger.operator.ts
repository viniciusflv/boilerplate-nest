import { MonoTypeOperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PinoLogger } from 'nestjs-pino';

import { catchException } from './catch-exception.operator';

export function loggerOperator<T>(
  logger: PinoLogger,
  message: string,
  info = {},
): MonoTypeOperatorFunction<T> {
  return (stream) =>
    stream.pipe(
      tap((response) =>
        logger.info({ ...info, response }, `Successo ao ${message}`),
      ),
      catchException((error) =>
        logger.error({ ...info, error }, `Erro ao ${message}`),
      ),
    );
}
