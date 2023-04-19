import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";

// import type { Context } from "./context.js";
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
const mode = GetApplicationMode();
const app = express();
const httpServer = http.createServer(app);

// initialize apollo server, the graphql layer will sit on top of our API
// TODO: <Context>
const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  plugins: [
    mode === "production"
      ? ApolloServerPluginLandingPageProductionDefault({
          graphRef: "my-graph-id@my-graph-variant", // needs update
          footer: false,
        })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),

    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
});

await apolloServer.start();

// serve client assets
// TODO: context
app.use(
  "/",
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(apolloServer, {
    context: async ({ req }) => {
      const token = req.headers.token || "";
      return { token };
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
