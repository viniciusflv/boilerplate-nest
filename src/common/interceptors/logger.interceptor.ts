import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { catchException } from '../operators/catch-exception.operator';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly message: string;
  private readonly context: string;

  constructor(context: string, message: string) {
    this.message = message;
    this.context = context;
  }

  intercept(
    ctx: ExecutionContext & { contextType: string },
    next: CallHandler,
  ): Observable<unknown> {
    const {
      log: logger,
      params,
      query,
      body,
    } = ctx?.contextType === 'graphql'
      ? ctx?.getArgByIndex(2)?.req
      : ctx?.switchToHttp()?.getRequest();

    const logs = {
      context: this.context,
      request: { params, query, body },
    };

    logger.info(logs, `[${this.context}] Começando a ${this.message}`);

    return next.handle().pipe(
      tap((response) =>
        logger.info(
          { ...logs, response },
          `[${this.context}] Successo ao ${this.message}`,
        ),
      ),
      catchException((error) =>
        logger.error(
          { ...logs, error },
          `[${this.context}] Erro ao ${this.message}`,
        ),
      ),
    );
  }
}
