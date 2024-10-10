import { Resolver, FieldResolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Trigger, ResourceTemplate } from "../types";
import { DataService } from "../services/data.service";

@Service()
@Resolver(() => Trigger)
export class TriggerResolver {
  constructor(private dataService: DataService) {}

  @FieldResolver(() => ResourceTemplate, { nullable: true })
  async resourceTemplate(
    @Root() trigger: Trigger
  ): Promise<ResourceTemplate | null> {
    if (!trigger.resourceTemplateId) return null;
    const resourceTemplates = await this.dataService.getResourceTemplates();
    return (
      resourceTemplates.find(
        (rt: ResourceTemplate) => rt._id === trigger.resourceTemplateId
      ) || null
    );
  }
}
