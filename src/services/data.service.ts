import { Service } from "typedi";
import fs from "fs/promises";
import path from "path";
import {
  NodeObject,
  Action,
  Response,
  Trigger,
  ResourceTemplate,
} from "../types";

@Service()
export class DataService {
  private dataCache: {
    nodes?: NodeObject[];
    actions?: Action[];
    responses?: Response[];
    triggers?: Trigger[];
    resourceTemplates?: ResourceTemplate[];
  } = {};

  private async readJsonFile<T>(filename: string): Promise<T[]> {
    const filePath = path.join(__dirname, "../data/json", filename);
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);

    return Array.isArray(jsonData)
      ? jsonData
      : jsonData[Object.keys(jsonData)[0]];
  }

  async getNodes(): Promise<NodeObject[]> {
    if (!this.dataCache.nodes) {
      this.dataCache.nodes = await this.readJsonFile<NodeObject>("node.json");
    }
    return this.dataCache.nodes;
  }

  async getActions(): Promise<Action[]> {
    if (!this.dataCache.actions) {
      this.dataCache.actions = await this.readJsonFile<Action>("action.json");
    }
    return this.dataCache.actions;
  }

  async getResponses(): Promise<Response[]> {
    if (!this.dataCache.responses) {
      this.dataCache.responses = await this.readJsonFile<Response>(
        "response.json"
      );
    }
    return this.dataCache.responses;
  }

  async getTriggers(): Promise<Trigger[]> {
    if (!this.dataCache.triggers) {
      this.dataCache.triggers = await this.readJsonFile<Trigger>(
        "trigger.json"
      );
    }
    return this.dataCache.triggers;
  }

  async getResourceTemplates(): Promise<ResourceTemplate[]> {
    if (!this.dataCache.resourceTemplates) {
      this.dataCache.resourceTemplates =
        await this.readJsonFile<ResourceTemplate>("resourceTemplate.json");
    }
    return this.dataCache.resourceTemplates;
  }
}
