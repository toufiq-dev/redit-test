import { Resolver, Query, Arg, FieldResolver, Root, ID } from "type-graphql";
import { Service } from "typedi";
import { NodeObject, Action, Response, Trigger } from "../types";
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

  @FieldResolver(() => Trigger, { nullable: true })
  async resolvedTrigger(@Root() node: NodeObject): Promise<Trigger | null> {
    if (!node.trigger) return null;
    return this.nodeService.findTriggerById(node.trigger);
  }

  @FieldResolver(() => [Action], { nullable: true })
  async resolvedPreActions(@Root() node: NodeObject): Promise<Action[]> {
    if (!node.preActions?.length) return [];
    return this.nodeService.findActionsByIds(node.preActions);
  }

  @FieldResolver(() => [Action], { nullable: true })
  async resolvedPostActions(@Root() node: NodeObject): Promise<Action[]> {
    if (!node.postActions?.length) return [];
    return this.nodeService.findActionsByIds(node.postActions);
  }

  @FieldResolver(() => [NodeObject], { nullable: true })
  async resolvedParents(@Root() node: NodeObject): Promise<NodeObject[]> {
    if (!node.parents?.length) return [];
    return this.nodeService.findByIds(node.parents);
  }
}
