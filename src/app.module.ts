import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ModuleModule } from './module/module.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === 'test' ? 'silent' : 'info',
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/gql',
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        'subscriptions-transport-ws': true,
      },
    }),
    ModuleModule,
  ],
})
export class AppModule {}
