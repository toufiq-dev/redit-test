import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { authMiddleware } from "./middleware/auth.middleware";
import { resolvers } from "./resolvers";
import { CustomAuthChecker } from "./utils/auth-checker";
import { Context, CustomRequest } from "./types/context";
import dotenv from "dotenv";
import { generateToken } from "./utils/generate-token";

const token = generateToken();
console.log(token);

dotenv.config();

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = express();
  app.use(authMiddleware);

  const schema = await buildSchema({
    resolvers,
    container: Container,
    authChecker: CustomAuthChecker,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }): Context => {
      const customReq = req as CustomRequest;
      return {
        req: customReq,
        user: customReq.user,
      };
    },
  });

  await server.start();

  server.applyMiddleware({ app: app as any });

  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

bootstrap().catch(console.error);
