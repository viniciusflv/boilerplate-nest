import * as path from 'path';
import { Test } from '@nestjs/testing';
import * as deepmerge from 'deepmerge';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from 'nestjs-config';
import { Observable, throwError } from 'rxjs';
import { GraphQLModule } from '@nestjs/graphql';
import { HttpException, ModuleMetadata } from '@nestjs/common';

import { PubSubModule } from '../../src/pubsub.module';

export function mockSuccess<M>(mock: M): Observable<M> {
  return new Observable((subscribe) => {
    subscribe.next(mock);
    subscribe.complete();
  });
}

export const mockError = (...args: [Error] | [string, number]) => {
  const isNotError = typeof args[0] === 'string';
  return throwError(() =>
    isNotError ? new HttpException(args[0], args[1]) : args[0],
  );
};

export function createTestingModule(metadata: ModuleMetadata = {}) {
  const moduleRef = Test.createTestingModule(
    deepmerge(
      {
        imports: [
          GraphQLModule.forRoot({
            path: '/gql',
            autoSchemaFile: 'schema.gql',
            subscriptions: {
              'subscriptions-transport-ws': true,
            },
          }),
          LoggerModule.forRoot({ pinoHttp: { level: 'silent' } }),
          ConfigModule.load(
            path.resolve(__dirname, '../../src/**/!(*.d).config.{ts,js}'),
            {
              modifyConfigName: (name) => name.replace('.config', ''),
            },
          ),
          PubSubModule,
        ],
        providers: [],
      } as ModuleMetadata,
      metadata,
    ),
  );

  return moduleRef;
}
