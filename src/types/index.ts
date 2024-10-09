import { ObjectType, Field, ID } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

@ObjectType()
export class ResourceTemplate {
  @Field(() => ID)
  _id: string;

  @Field()
  createdAt: number;

  @Field({ nullable: true })
  updatedAt?: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  schema?: any;

  @Field({ nullable: true })
  integrationId?: string;

  @Field({ nullable: true })
  functionString?: string;

  @Field({ nullable: true })
  key?: string;
}

@ObjectType()
export class Action {
  @Field(() => ID)
  _id: string;

  @Field()
  createdAt: number;

  @Field({ nullable: true })
  updatedAt?: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  functionString?: string;

  @Field(() => ID, { nullable: true })
  resourceTemplateId?: string;

  @Field(() => ResourceTemplate, { nullable: true })
  resourceTemplate?: ResourceTemplate;
}

@ObjectType()
export class Trigger {
  @Field(() => ID)
  _id: string;

  @Field()
  createdAt: number;

  @Field({ nullable: true })
  updatedAt?: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  functionString?: string;

  @Field(() => ID, { nullable: true })
  resourceTemplateId?: string;

  @Field(() => ResourceTemplate, { nullable: true })
  resourceTemplate?: ResourceTemplate;
}

@ObjectType()
export class ResponseVariation {
  @Field()
  name: string;

  @Field(() => GraphQLJSON)
  responses: any;
}

@ObjectType()
export class ResponseLocaleGroup {
  @Field(() => ID)
  localeGroupId: string;

  @Field(() => [ResponseVariation])
  variations: ResponseVariation[];
}

@ObjectType()
export class ResponsePlatform {
  @Field(() => ID)
  integrationId: string;

  @Field()
  build: number;

  @Field(() => [ResponseLocaleGroup])
  localeGroups: ResponseLocaleGroup[];
}

@ObjectType()
export class Response {
  @Field(() => ID)
  _id: string;

  @Field()
  createdAt: number;

  @Field({ nullable: true })
  updatedAt?: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [ResponsePlatform])
  platforms: ResponsePlatform[];
}

@ObjectType()
export class NodeObject {
  @Field(() => ID)
  _id: string;

  @Field()
  createdAt: number;

  @Field({ nullable: true })
  updatedAt?: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [NodeObject], { nullable: true })
  parents?: NodeObject[];

  @Field(() => [ID], { nullable: true })
  parentIds?: string[];

  @Field(() => Boolean)
  root: boolean;

  @Field(() => Trigger, { nullable: true })
  trigger?: Trigger;

  @Field(() => ID, { nullable: true })
  triggerId?: string;

  @Field(() => [Response], { nullable: true })
  responses?: Response[];

  @Field(() => [ID], { nullable: true })
  responseIds?: string[];

  @Field(() => [Action], { nullable: true })
  actions?: Action[];

  @Field(() => [ID], { nullable: true })
  actionIds?: string[];

  @Field()
  priority: number;

  @Field(() => ID, { nullable: true })
  compositeId?: string;

  @Field(() => Boolean)
  global: boolean;

  @Field({ nullable: true })
  colour?: string;
}
