# GraphQL API Server

This is a GraphQL API server implemented using Node.js, Express, and Apollo Server. It provides a flexible and efficient way to query and manipulate data related to nodes, actions, responses, and triggers.

## Features

- GraphQL API with TypeGraphQL for type-safe schema definition
- Authentication using JWT (JSON Web Tokens)
- Data persistence using JSON files
- Modular architecture with services and resolvers
- TypeScript for enhanced developer experience and type safety

## Authentication

The API uses Bearer token authentication. To authenticate your requests, include the following header:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyODYzMzMwMCwiZXhwIjoxNzI4NzE5NzAwfQ.u6iE2xY_sMk6ZAl-t8vIeaKHbxqGFa63qQYYUuv6yIY

## API Schema

The API provides the following main types:

- `NodeObject`: Represents a node in the system
- `Action`: Represents an action that can be performed
- `Response`: Represents a response to an action
- `Trigger`: Represents a trigger for an action
- `ResourceTemplate`: Represents a template for resources

For detailed schema information, refer to the GraphQL schema definition in the code or use the GraphQL Playground's documentation explorer.

## Main Queries

- `node(nodeId: ID!): NodeObject`: Fetch a single node by ID
- `nodes(limit: Int, offset: Int): [NodeObject!]!`: Fetch multiple nodes with optional pagination
- `nodeByCompositeId(compositeId: String!): NodeObject`: Fetch a node by its composite ID

## Development

The project structure is as follows:

- `src/`
  - `data/`: Contains JSON data files
  - `middleware/`: Express middlewares
  - `resolvers/`: GraphQL resolvers
  - `services/`: Business logic and data access
  - `types/`: TypeScript type definitions
  - `utils/`: Utility functions
  - `index.ts`: Main application entry point

## Main Queries

- `node(nodeId: ID!): NodeObject`: Fetch a single node by ID
- `actions(limit: Int, offset: Int): [Action!]!`: Fetch actions with optional pagination
- `responses(limit: Int, offset: Int): [Response!]!`: Fetch responses with optional pagination
- `nodeByCompositeId(compositeId: String!): NodeObject`: Fetch a node by its composite ID
- `nodesByParentCompositeId(compositeId: String!): [NodeObject!]!`: Fetch child nodes by parent's composite ID
