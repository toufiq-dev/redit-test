export const mockData = {
  nodes: [
    {
      _id: "1",
      createdAt: Date.now(),
      name: "Root Node",
      description: "This is a root node",
      parentIds: ["2"],
      root: true,
      triggerId: "1",
      responseIds: ["1"],
      actionIds: ["1"],
      priority: 1.0,
      compositeId: "comp1",
      global: false,
      colour: "#FF0000",
    },
    {
      _id: "2",
      createdAt: Date.now(),
      name: "Parent Node",
      description: "This is a parent node",
      root: false,
      actionIds: ["2"],
      priority: 0.5,
      global: true,
    },
  ],
  actions: [
    {
      _id: "1",
      createdAt: Date.now(),
      name: "Test Action",
      description: "This is a test action",
      functionString: "function() { return true; }",
      resourceTemplateId: "1",
    },
    {
      _id: "2",
      createdAt: Date.now(),
      name: "Another Action",
      description: "This is another action",
      functionString: "function() { return false; }",
    },
  ],
  responses: [
    {
      _id: "1",
      createdAt: Date.now(),
      name: "Test Response",
      description: "This is a test response",
      platforms: [
        {
          integrationId: "int1",
          build: 1,
          localeGroups: [
            {
              localeGroupId: "lg1",
              variations: [
                {
                  name: "Default",
                  responses: { text: "Hello, world!" },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  triggers: [
    {
      _id: "1",
      createdAt: Date.now(),
      name: "Test Trigger",
      description: "This is a test trigger",
      functionString: "function() { return true; }",
      resourceTemplateId: "1",
    },
  ],
  resourceTemplates: [
    {
      _id: "1",
      createdAt: Date.now(),
      name: "Test Template",
      description: "This is a test template",
      schema: { type: "object", properties: {} },
      integrationId: "int1",
      key: "test-template",
    },
  ],
};
