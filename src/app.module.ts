import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { GraphQLModule } from '@nestjs/graphql';

import { PubSubModule } from './pubsub.module';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { ExceptionModule } from './exception.module';

@Module({
  imports: [
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
    HelloWorldModule,
    PubSubModule,
    ExceptionModule,
  ],
})
export class AppModule {}
