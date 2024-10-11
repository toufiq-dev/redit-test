jest.mock("type-graphql", () => ({
  Resolver: () => jest.fn(),
  Query: () => jest.fn(),
  Arg: () => jest.fn(),
  FieldResolver: () => jest.fn(),
  Root: () => jest.fn(),
  ID: () => jest.fn(),
  Authorized: () => jest.fn(),
  Int: () => jest.fn(),
  Field: () => jest.fn(),
  ObjectType: () => jest.fn(),
}));

import { NodeResolver } from "../../resolvers/node.resolver";
import { NodeService } from "../../services/node.service";
import { DataService } from "../../services/data.service";
import { Action, Response } from "../../types";

jest.mock("../../services/node.service");
jest.mock("../../services/data.service");

describe("NodeResolver", () => {
  let nodeResolver: NodeResolver;
  let mockNodeService: jest.Mocked<NodeService>;
  let mockDataService: jest.Mocked<DataService>;

  beforeEach(() => {
    mockNodeService = new NodeService(null as any) as jest.Mocked<NodeService>;
    mockDataService = new DataService() as jest.Mocked<DataService>;
    nodeResolver = new NodeResolver(mockNodeService, mockDataService);
  });

  describe("node", () => {
    it("should return a node by id", async () => {
      const mockNode: any = {
        _id: "1",
        name: "Test Node",
        createdAt: Date.now(),
        root: false,
        global: false,
      };
      mockNodeService.findById.mockResolvedValue(mockNode);

      const result = await nodeResolver.node("1");
      expect(result).toEqual(mockNode);
      expect(mockNodeService.findById).toHaveBeenCalledWith("1");
    });
  });

  describe("actions", () => {
    it("should return all actions when no limit or offset is provided", async () => {
      const mockActions: Action[] = [
        { _id: "1", name: "Action 1", createdAt: Date.now() },
        { _id: "2", name: "Action 2", createdAt: Date.now() },
      ];
      mockDataService.getActions.mockResolvedValue(mockActions);

      const result = await nodeResolver.actions();
      expect(result).toEqual(mockActions);
    });

    it("should return sliced actions when limit and offset are provided", async () => {
      const mockActions: Action[] = [
        { _id: "1", name: "Action 1", createdAt: Date.now() },
        { _id: "2", name: "Action 2", createdAt: Date.now() },
        { _id: "3", name: "Action 3", createdAt: Date.now() },
      ];
      mockDataService.getActions.mockResolvedValue(mockActions);

      const result = await nodeResolver.actions(2, 1);
      expect(result).toEqual([
        { _id: "2", name: "Action 2", createdAt: expect.any(Number) },
        { _id: "3", name: "Action 3", createdAt: expect.any(Number) },
      ]);
    });
  });

  describe("responses", () => {
    it("should return all responses when no limit or offset is provided", async () => {
      const mockResponses: Response[] = [
        { _id: "1", name: "Response 1", createdAt: Date.now(), platforms: [] },
        { _id: "2", name: "Response 2", createdAt: Date.now(), platforms: [] },
      ];
      mockDataService.getResponses.mockResolvedValue(mockResponses);

      const result = await nodeResolver.responses();
      expect(result).toEqual(mockResponses);
    });

    it("should return sliced responses when limit and offset are provided", async () => {
      const mockResponses: Response[] = [
        { _id: "1", name: "Response 1", createdAt: Date.now(), platforms: [] },
        { _id: "2", name: "Response 2", createdAt: Date.now(), platforms: [] },
        { _id: "3", name: "Response 3", createdAt: Date.now(), platforms: [] },
      ];
      mockDataService.getResponses.mockResolvedValue(mockResponses);

      const result = await nodeResolver.responses(2, 1);
      expect(result).toEqual([
        {
          _id: "2",
          name: "Response 2",
          createdAt: expect.any(Number),
          platforms: [],
        },
        {
          _id: "3",
          name: "Response 3",
          createdAt: expect.any(Number),
          platforms: [],
        },
      ]);
    });
  });
});
