import express, { Express } from "express";
import EnvInit from "./middlewares/env.middleware.js";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { schema } from "./schema.js";
import { context } from "./context.js";
import { initializeDatabase, prisma } from "./prisma/index.js";
import { GetApplicationMode } from "./utils/mode.util.js";
import { ServeClientStaticAssets } from "./middlewares/client.middleware.js";
import GeneralMiddleware from "./middlewares/general.middleware.js";

// initialize application variables
EnvInit();
const port = Number(process.env.PORT) || 8081;
const mode = GetApplicationMode();
const app: Express = express();

// initialize apollo graphql server
const httpServer = http.createServer(app);
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

// initialize ORM connection to database
initializeDatabase()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

app.use(ServeClientStaticAssets());

app.use(GeneralMiddleware);

app.use(
  "/",
  cors<cors.CorsRequest>({
    origin: ["http://localhost:3001", "https://studio.apollographql.com"],
    credentials: true,
  }),
  // bodyParser.json(),
  expressMiddleware(apolloServer, {
    context,
  })
);

// modified server startup
await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

console.log(`[server]: 🚀 Server ready at http://localhost:${port}`);
//intialize server

// serving client and listening on port
// server.use("/", ServeClient); ?? not sure what to do with this
