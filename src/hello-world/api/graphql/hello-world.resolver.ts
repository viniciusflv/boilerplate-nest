import { tap } from 'rxjs/operators';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Resolver, Query, Subscription, Mutation, Args } from '@nestjs/graphql';

import { HelloWorldModel } from './response/hello-world.model';
import { HelloWorldService } from '../../service/hello-world.service';
import { Logger } from '../../../common/decorators/logger.decorator';

@Resolver(() => HelloWorldModel)
export class HelloWorldResolver {
  constructor(
    @Inject('PubSub')
    private readonly pubSub: PubSub,
    private readonly helloWorldService: HelloWorldService,
  ) {}

  @Query(() => HelloWorldModel)
  @Logger(HelloWorldResolver.name, 'pegar o olá mundo')
  helloWorld() {
    return this.helloWorldService.getHelloWorld();
  }

  @Mutation(() => HelloWorldModel)
  setHelloWorld(@Args('message', { type: () => String }) message: string) {
    const helloWorld: HelloWorldModel = {
      helloWorld: message,
    };
    return this.helloWorldService
      .setHelloWorld(helloWorld)
      .pipe(tap(() => this.pubSub.publish('helloWorldChanged', helloWorld)));
  }

  @Subscription(() => HelloWorldModel, {
    resolve: (value) => value,
  })
  helloWorldChanged() {
    return this.pubSub.asyncIterator<HelloWorldModel>('helloWorldChanged');
  }
}
