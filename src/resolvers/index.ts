import { NonEmptyArray } from "type-graphql";
import { NodeResolver } from "./node.resolver";

export const resolvers: NonEmptyArray<Function> = [NodeResolver];
