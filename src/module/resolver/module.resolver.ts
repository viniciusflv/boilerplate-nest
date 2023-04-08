import { PubSub } from 'graphql-subscriptions';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import {
  ModuleModel,
  MutationModuleModel,
  MutationModuleResponseModel,
} from './module.model';
import { ModuleService } from '../service/module.service';
import { tap } from 'rxjs';

const pubSub = new PubSub();

@Resolver(() => ModuleModel)
export class ModuleResolver {
  constructor(private readonly moduleService: ModuleService) {}

  @Query(() => ModuleModel)
  read(@Args('id', { type: () => String }) id: string) {
    return this.moduleService.read(id);
  }

  @Mutation(() => MutationModuleResponseModel)
  create(@Args('data', { type: () => MutationModuleModel }) data: ModuleModel) {
    return this.moduleService.create(data).pipe(
      tap((response) => {
        pubSub.publish('create', response);
      }),
    );
  }

  @Subscription(() => MutationModuleResponseModel, {
    resolve: (value) => value,
  })
  created() {
    return pubSub.asyncIterator<MutationModuleResponseModel>('create');
  }
}
