import { Resolver, Query, Arg, ID, FieldResolver, Root } from "type-graphql";
import { Service } from "typedi";
import { NodeObject, Action, Response, Trigger } from "../types";
import { NodeService } from "../services/node.service";

@Service()
@Resolver(NodeObject)
export class NodeResolver {
  constructor(private nodeService: NodeService) {}

  @Query(() => NodeObject, { nullable: true })
  async node(
    @Arg("nodeId", () => ID) nodeId: string
  ): Promise<NodeObject | null> {
    return this.nodeService.findById(nodeId);
  }

  @FieldResolver(() => [NodeObject], { nullable: true })
  async parents(@Root() node: NodeObject): Promise<NodeObject[]> {
    if (!node.parentIds?.length) return [];
    return this.nodeService.findByIds(node.parentIds);
  }

  @FieldResolver(() => [Action], { nullable: true })
  async actions(@Root() node: NodeObject): Promise<Action[]> {
    if (!node.actionIds?.length) return [];
    return this.nodeService.findActionsByIds(node.actionIds);
  }

  @FieldResolver(() => [Response], { nullable: true })
  async responses(@Root() node: NodeObject): Promise<Response[]> {
    if (!node.responseIds?.length) return [];
    return this.nodeService.findResponsesByIds(node.responseIds);
  }

  @FieldResolver(() => Trigger, { nullable: true })
  async trigger(@Root() node: NodeObject): Promise<Trigger | null> {
    if (!node.triggerId) return null;
    return this.nodeService.findTriggerById(node.triggerId);
  }
}
