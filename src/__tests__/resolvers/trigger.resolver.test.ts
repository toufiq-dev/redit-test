import { TriggerResolver } from "../../resolvers/trigger.resolver";
import { DataService } from "../../services/data.service";
import { Trigger, ResourceTemplate } from "../../types";

jest.mock("../../services/data.service");

describe("TriggerResolver", () => {
  let triggerResolver: TriggerResolver;
  let mockDataService: jest.Mocked<DataService>;

  beforeEach(() => {
    mockDataService = new DataService() as jest.Mocked<DataService>;
    triggerResolver = new TriggerResolver(mockDataService);
  });

  describe("resourceTemplate", () => {
    it("should return null when trigger has no resourceTemplateId", async () => {
      const trigger: Trigger = {
        _id: "1",
        name: "Test Trigger",
        createdAt: Date.now(),
      };
      const result = await triggerResolver.resourceTemplate(trigger);
      expect(result).toBeNull();
    });

    it("should return the correct resource template", async () => {
      const trigger: Trigger = {
        _id: "1",
        name: "Test Trigger",
        createdAt: Date.now(),
        resourceTemplateId: "rt1",
      };
      const mockResourceTemplates: ResourceTemplate[] = [
        { _id: "rt1", name: "Resource Template 1", createdAt: Date.now() },
        { _id: "rt2", name: "Resource Template 2", createdAt: Date.now() },
      ];
      mockDataService.getResourceTemplates.mockResolvedValue(
        mockResourceTemplates
      );

      const result = await triggerResolver.resourceTemplate(trigger);
      expect(result).toEqual(
        expect.objectContaining({ _id: "rt1", name: "Resource Template 1" })
      );
    });
  });
});
