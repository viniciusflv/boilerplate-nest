import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class ModuleModel {
  @Field()
  name: string;
}

@ObjectType()
export class MutationModuleResponseModel {
  @Field()
  id: string;
  @Field()
  name: string;
}

@InputType()
export class MutationModuleModel {
  @Field()
  name: string;
}
