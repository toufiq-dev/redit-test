import { NonEmptyArray } from "type-graphql";
import { NodeResolver } from "./node.resolver";
import { TriggerResolver } from "./trigger.resolver";
import { ActionResolver } from "./action.resolver";

export const resolvers: NonEmptyArray<Function> = [
  NodeResolver,
  TriggerResolver,
  ActionResolver,
];
