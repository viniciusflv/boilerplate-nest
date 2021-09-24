import * as path from 'path';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from 'nestjs-config';
import { GraphQLModule } from '@nestjs/graphql';
import { HttpModule, Module } from '@nestjs/common';

import { PubSubModule } from './pubsub.module';
import { ExceptionModule } from './exception.module';
import { HelloWorldModule } from './hello-world/hello-world.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, '**/!(*.d).config.{ts,js}'), {
      modifyConfigName: (name) => name.replace('.config', ''),
    }),
    GraphQLModule.forRoot({
      path: '/gql',
      autoSchemaFile: 'schema.gql',
      playground: process.env.ENV !== 'prd',
      subscriptions: {
        'subscriptions-transport-ws': true,
      },
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: process.env.NODE_ENV !== 'production',
        level: process.env.NODE_ENV === 'test' ? 'silent' : 'info',
      },
    }),
    HttpModule,
    PubSubModule,
    ExceptionModule,
    HelloWorldModule,
  ],
})
export class AppModule {}
