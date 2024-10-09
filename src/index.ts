import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { authMiddleware } from "./middleware/auth.middleware";
import { resolvers } from "./resolvers";
import { CustomAuthChecker } from "./utils/auth-checker";
import { PORT } from "./config/constants";
import { Application } from "express";

async function bootstrap() {
  const app: Application = express();
  app.use(authMiddleware);

  const schema = await buildSchema({
    resolvers,
    container: Container,
    authChecker: CustomAuthChecker,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      return {
        req,
        user: req.user,
      };
    },
  });

  await server.start();

  // Explicitly type the app parameter
  server.applyMiddleware({ app: app as any });

  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

bootstrap().catch(console.error);
