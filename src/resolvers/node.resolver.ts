import { Resolver, Query, Arg, FieldResolver, Root, ID } from "type-graphql";
import { Service } from "typedi";
import { NodeObject } from "../types";
import { Action } from "../types";
import { Response } from "../types";
import { NodeService } from "../services/node.service";

@Service()
@Resolver(() => NodeObject)
export class NodeResolver {
  constructor(private nodeService: NodeService) {}

  @Query(() => NodeObject, { nullable: true })
  async node(
    @Arg("nodeId", () => ID) nodeId: string
  ): Promise<NodeObject | null> {
    return this.nodeService.findById(nodeId);
  }

  @FieldResolver(() => [Action], { nullable: true })
  async resolvedActions(@Root() node: NodeObject): Promise<Action[]> {
    if (!node.actions?.length) return [];
    return this.nodeService.findActionsByIds(node.actions);
  }

  @FieldResolver(() => [Response], { nullable: true })
  async resolvedResponses(@Root() node: NodeObject): Promise<Response[]> {
    if (!node.responses?.length) return [];
    return this.nodeService.findResponsesByIds(node.responses);
  }
}
