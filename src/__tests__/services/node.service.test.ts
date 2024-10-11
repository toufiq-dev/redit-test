import { NodeService } from "../../services/node.service";
import { DataService } from "../../services/data.service";
import { NodeObject, Action, Response, Trigger } from "../../types";

jest.mock("../../services/data.service");

describe("NodeService", () => {
  let nodeService: NodeService;
  let mockDataService: jest.Mocked<DataService>;

  beforeEach(() => {
    mockDataService = new DataService() as jest.Mocked<DataService>;
    nodeService = new NodeService(mockDataService);
  });

  describe("findById", () => {
    it("should return a node by id", async () => {
      const mockNodes: any = [
        {
          _id: "1",
          name: "Node 1",
          createdAt: Date.now(),
          root: false,
          global: false,
        },
        {
          _id: "2",
          name: "Node 2",
          createdAt: Date.now(),
          root: false,
          global: false,
        },
      ];
      mockDataService.getNodes.mockResolvedValue(mockNodes);

      const result = await nodeService.findById("1");
      expect(result).toEqual(
        expect.objectContaining({ _id: "1", name: "Node 1" })
      );
    });

    it("should return null if node is not found", async () => {
      const mockNodes: any = [
        {
          _id: "1",
          name: "Node 1",
          createdAt: Date.now(),
          root: false,
          global: false,
        },
      ];
      mockDataService.getNodes.mockResolvedValue(mockNodes);

      const result = await nodeService.findById("2");
      expect(result).toBeNull();
    });
  });

  // Add more tests for other methods...
});
