import { ActionResolver } from "../../resolvers/action.resolver";
import { DataService } from "../../services/data.service";
import { Action, ResourceTemplate } from "../../types";

jest.mock("../../services/data.service");

describe("ActionResolver", () => {
  let actionResolver: ActionResolver;
  let mockDataService: jest.Mocked<DataService>;

  beforeEach(() => {
    mockDataService = new DataService() as jest.Mocked<DataService>;
    actionResolver = new ActionResolver(mockDataService);
  });

  describe("resourceTemplate", () => {
    it("should return null when action has no resourceTemplateId", async () => {
      const action: Action = {
        _id: "1",
        name: "Test Action",
        createdAt: Date.now(),
      };
      const result = await actionResolver.resourceTemplate(action);
      expect(result).toBeNull();
    });

    it("should return the correct resource template", async () => {
      const action: Action = {
        _id: "1",
        name: "Test Action",
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

      const result = await actionResolver.resourceTemplate(action);
      expect(result).toEqual(
        expect.objectContaining({ _id: "rt1", name: "Resource Template 1" })
      );
    });
  });
});
