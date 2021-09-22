import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HelloWorldModel {
  @Field()
  helloWorld: string;
}
