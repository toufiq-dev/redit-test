import { ObjectType, Field, ID } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

@ObjectType()
export class ResourceTemplate {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
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
  @Field()
  localeGroup: string;

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

  @Field(() => [ID], { nullable: true })
  parents?: string[];

  @Field(() => [ID], { nullable: true })
  parentIds?: string[];

  @Field(() => Boolean)
  root: boolean;

  @Field(() => ID, { nullable: true })
  trigger?: string;

  @Field(() => ID, { nullable: true })
  triggerId?: string;

  @Field(() => [ID], { nullable: true })
  responses?: string[];

  @Field(() => [ID], { nullable: true })
  responseIds?: string[];

  @Field(() => [ID], { nullable: true })
  actions?: string[];

  @Field(() => [ID], { nullable: true })
  actionIds?: string[];

  @Field(() => [ID], { nullable: true })
  preActions?: string[];

  @Field(() => [ID], { nullable: true })
  postActions?: string[];

  @Field({ nullable: true })
  priority: number;

  @Field(() => ID, { nullable: true })
  compositeId?: string;

  @Field(() => Boolean)
  global: boolean;

  @Field({ nullable: true })
  colour?: string;

  @Field(() => Trigger, { nullable: true })
  resolvedTrigger?: Trigger;

  @Field(() => [Action], { nullable: true })
  resolvedActions?: Action[];

  @Field(() => [Action], { nullable: true })
  resolvedPreActions?: Action[];

  @Field(() => [Action], { nullable: true })
  resolvedPostActions?: Action[];

  @Field(() => [Response], { nullable: true })
  resolvedResponses?: Response[];

  @Field(() => [NodeObject], { nullable: true })
  resolvedParents?: NodeObject[];
}
