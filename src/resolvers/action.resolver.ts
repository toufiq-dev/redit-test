import { Resolver, FieldResolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Action, ResourceTemplate } from "../types";
import { DataService } from "../services/data.service";

@Service()
@Resolver(() => Action)
export class ActionResolver {
  constructor(private dataService: DataService) {}

  @FieldResolver(() => ResourceTemplate, { nullable: true })
  async resourceTemplate(
    @Root() action: Action
  ): Promise<ResourceTemplate | null> {
    if (!action.resourceTemplateId) return null;
    const resourceTemplates = await this.dataService.getResourceTemplates();
    return (
      resourceTemplates.find((rt) => rt._id === action.resourceTemplateId) ||
      null
    );
  }
}
