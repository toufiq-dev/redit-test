import { Service } from "typedi";
import { NodeObject, Action, Response, Trigger } from "../types";
import { DataService } from "./data.service";

@Service()
export class NodeService {
  constructor(private dataService: DataService) {}

  async findById(id: string): Promise<NodeObject | null> {
    const nodes = await this.dataService.getNodes();
    return nodes.find((node) => node._id === id) || null;
  }

  async findAll(limit?: number, offset?: number): Promise<NodeObject[]> {
    const nodes = await this.dataService.getNodes();
    if (limit !== undefined && offset !== undefined) {
      return nodes.slice(offset, offset + limit);
    }
    return nodes;
  }

  async findByIds(ids: string[]): Promise<NodeObject[]> {
    const nodes = await this.dataService.getNodes();
    return nodes.filter((node) => ids.includes(node._id));
  }

  async findActionsByIds(ids: string[]): Promise<Action[]> {
    const actions = await this.dataService.getActions();
    return actions.filter((action) => ids.includes(action._id));
  }

  async findResponsesByIds(ids: string[]): Promise<Response[]> {
    const responses = await this.dataService.getResponses();
    return responses.filter((response) => ids.includes(response._id));
  }

  async findTriggerById(id: string): Promise<Trigger | null> {
    const triggers = await this.dataService.getTriggers();
    return triggers.find((trigger) => trigger._id === id) || null;
  }

  async findByCompositeId(compositeId: string): Promise<NodeObject | null> {
    const nodes = await this.dataService.getNodes();
    return nodes.find((node) => node.compositeId === compositeId) || null;
  }
}
