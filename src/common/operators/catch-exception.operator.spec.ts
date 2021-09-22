import { HttpException, HttpStatus } from '@nestjs/common';
import { throwError } from 'rxjs';

import { catchException } from './catch-exception.operator';

describe('Catch exeception', () => {
  it('with parameters', (done) => {
    const error = throwError(
      () => new HttpException('Bad request', HttpStatus.BAD_REQUEST),
    );

    function exec() {
      return 'Test';
    }

    return error.pipe(catchException(exec)).subscribe({
      error: (err: () => HttpException) => {
        expect(err().message).toEqual('Bad request');
        expect(err().getStatus()).toEqual(HttpStatus.BAD_REQUEST);
        done();
      },
    });
  });

  it('without parameters', (done) => {
    const error = throwError(
      () => new HttpException('Bad request', HttpStatus.BAD_REQUEST),
    );

    return error.pipe(catchException()).subscribe({
      error: (err: () => HttpException) => {
        expect(err().message).toEqual('Bad request');
        expect(err().getStatus()).toEqual(HttpStatus.BAD_REQUEST);
        done();
      },
    });
  });
});
