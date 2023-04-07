// import express, { Express, Request, Response } from "express";
// import GeneralMiddleware from "./middlewares/general.middleware.js";
// import { GetApplicationMode } from "./utils/mode.util.js";
// import {
//   ServeClient,
//   ServeClientStaticAssets,
// } from "./middlewares/client.middleware.js";
import EnvInit from "./middlewares/env.middleware.js";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema.js";
import { context } from "./context.js";

// initialize server variables
EnvInit();
const port = Number(process.env.PORT) || 8081;
// const mode = GetApplicationMode();
// const server: Express = express();

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageProductionDefault({
          graphRef: "my-graph-id@my-graph-variant", // needs update
          footer: false,
        })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
});

const { url } = await startStandaloneServer(apolloServer, {
  // context,
  listen: { port },
});

console.log(`🚀  Server ready at ${url}`);

//intialize server
// server.use(ServeClientStaticAssets());
// server.use(GeneralMiddleware);

// serving client and listening on port
// server.use("/", ServeClient);
// server.listen(port, () => {
//   console.log(
//     `[server]: Server is running at http://localhost:${port} in ${mode} mode`
//   );
// });
