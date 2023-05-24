import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { GraphQLError } from "graphql";
import depthLimit from "graphql-depth-limit";
import http from "http";

import { type Context, decodeAuthHeader } from "./context.js";
import {
  ServeClient,
  ServeClientStaticAssets,
} from "./middlewares/client.middleware.js";
import EnvInit from "./middlewares/env.middleware.js";
import generalMiddleware from "./middlewares/general.middleware.js";
import { initializeDatabase, prisma } from "./prisma/index.js";
import { schema } from "./schema.js";
import { GetApplicationMode } from "./utils/mode.util.js";

// initialize server variables
EnvInit();
const port = Number(process.env.PORT) || 8081;
const app = express();
const mode = GetApplicationMode();
const httpServer = http.createServer(app);

// initialize apollo server, the graphql layer will sit on top of our API
const apolloServer = new ApolloServer<Context>({
  schema,
  validationRules: [depthLimit(10)],
  introspection: mode === "production" ? false : true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError: (err) => {
    // Don't give the specific errors to the client
    if (err.message.startsWith("Database Error: ")) {
      return new Error("Internal server error");
    }
    // Otherwise return the original error
    return err;
  },
});

await apolloServer.start();

// serve client assets
app.use(
  "/",
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(apolloServer, {
    context: async ({ req }) => {
      if (!req.headers.authorization) {
        return {};
      } // do i want to throw an error here?

      try {
        const userId = decodeAuthHeader(req.headers.authorization);
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });

        // when this is turned on, headers must be available or else the request will fail
        // TODO: make login and create user public and able to bypass this
        // if (!user) {
        //   throw new GraphQLError("User is not authenticated");
        // }

        return {
          user: user || undefined,
        };
      } catch (error) {
        throw new GraphQLError("Error authenticating user");
      }
    },
  })
);

app.use(ServeClientStaticAssets());
app.use(generalMiddleware);
app.use("/client", ServeClient);

// restart the modified server
await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

// eslint-disable-next-line no-console
console.log(`🚀  Server ready at http://localhost:${port}`);

// initialize database connection via prisma
initializeDatabase()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
