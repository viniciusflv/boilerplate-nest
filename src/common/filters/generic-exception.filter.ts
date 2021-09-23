import { HttpException } from '@nestjs/common';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GenericExceptionFilter implements ExceptionFilter {
  catch(
    exception: InstanceType<typeof Error>,
    ctx: ArgumentsHost & { contextType: string },
  ) {
    const host = ctx.switchToHttp();
    const { params, query, body } =
      ctx?.contextType === 'graphql'
        ? ctx?.getArgByIndex(2)?.req
        : host?.getRequest();

    const request = { params, query, body };
    const response = host.getResponse<Record<string, any>>();

    if (!response?.status) return exception;

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const { code, ...details } = (exception?.getResponse() ?? {}) as any;

      return response?.status(exception.getStatus()).json({
        status,
        request,
        exception: {
          code,
          message: exception.message,
          details,
          stack: exception.stack,
        },
      });
    }

    return response?.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      request,
      exception: {
        code: 'ERR-500',
        message: exception.message,
        stack: exception.stack,
      },
    });
  }
}
