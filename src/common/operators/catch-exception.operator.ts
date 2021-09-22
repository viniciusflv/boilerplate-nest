import { throwError, MonoTypeOperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function catchException<T>(
  exec?: (error: unknown) => any,
): MonoTypeOperatorFunction<T> {
  return (stream) =>
    stream.pipe(
      catchError((error: unknown) => {
        if (typeof exec === 'function') {
          exec(error);
        }

        return throwError(error);
      }),
    );
}
