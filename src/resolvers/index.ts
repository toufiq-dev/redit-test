import { NonEmptyArray } from "type-graphql";
import { NodeResolver } from "./node.resolver";
import { TriggerResolver } from "./trigger.resolver";

export const resolvers: NonEmptyArray<Function> = [
  NodeResolver,
  TriggerResolver,
];
