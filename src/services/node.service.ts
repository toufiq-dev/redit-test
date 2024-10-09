import { Service } from "typedi";
import {
  NodeObject,
  Action,
  Response,
  Trigger,
  ResourceTemplate,
} from "../types";
import { mockData } from "../data/mock-data";

@Service()
export class NodeService {
  async findById(id: string): Promise<NodeObject | null> {
    return mockData.nodes.find((node) => node._id === id) || null;
  }

  async findByIds(ids: string[]): Promise<NodeObject[]> {
    return mockData.nodes.filter((node) => ids.includes(node._id));
  }

  async findActionsByIds(ids: string[]): Promise<Action[]> {
    return mockData.actions.filter((action) => ids.includes(action._id));
  }

  async findResponsesByIds(ids: string[]): Promise<Response[]> {
    return mockData.responses.filter((response) => ids.includes(response._id));
  }

  async findTriggerById(id: string): Promise<Trigger | null> {
    return mockData.triggers.find((trigger) => trigger._id === id) || null;
  }
}
