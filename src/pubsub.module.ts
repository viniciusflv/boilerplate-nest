import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Global()
@Module({
  providers: [
    {
      provide: PubSub.name,
      useValue: new PubSub(),
    },
  ],
  exports: [PubSub.name],
})
export class PubSubModule {}
