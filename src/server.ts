import EnvInit from "./middlewares/env.middleware.js";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema.js";
import { Context, context } from "./context.js";
import { initializeDatabase, prisma } from "./prisma/index.js";
import { GetApplicationMode } from "./utils/mode.util.js";

// initialize server variables
EnvInit();
const port = Number(process.env.PORT) || 8081;
const mode = GetApplicationMode();
// const app: Express = express();

const apolloServer = new ApolloServer<Context>({
  schema,
  introspection: true,
  plugins: [
    mode === "production"
      ? ApolloServerPluginLandingPageProductionDefault({
          graphRef: "my-graph-id@my-graph-variant", // needs update
          footer: false,
        })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
});

const { url } = await startStandaloneServer(apolloServer, {
  context,
  listen: { port },
});

console.log(`🚀  Server ready at ${url}`);

initializeDatabase()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// ? What to do with these?
// server.use(ServeClientStaticAssets());
// server.use(GeneralMiddleware);
// server.use("/", ServeClient);
