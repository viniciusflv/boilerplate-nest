import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string, status: HttpStatus, code: string, details = {}) {
    super({ ...details, code }, status);
    super.message = message;
  }
}
