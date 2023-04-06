import express, { Express, Request, Response } from "express";
import GeneralMiddleware from "./middlewares/general.middleware.js";
import { GetApplicationMode } from "./utils/mode.util.js";
import {
  ServeClient,
  ServeClientStaticAssets,
} from "./middlewares/client.middleware.js";
import EnvInit from "./middlewares/env.middleware.js";

import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema.js";

// initialize server variables
EnvInit();
const port = process.env.PORT || 8081;
const mode = GetApplicationMode();
const server: Express = express();

//intialize server
server.use(ServeClientStaticAssets());
server.use(GeneralMiddleware);

// sample api route
server.get("/api/v1", (_: Request, res: Response) => {
  res.json("Hello world!");
});

// connect to prisma (temp location)
const prisma = new PrismaClient();

async function main() {
  // query goes here
  prisma.$connect().then(async () => {
    console.log(`Connected to the postgres database with prisma`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const apolloServer = new ApolloServer({ schema });
// serving client and listening on port
server.use("/", ServeClient);
server.listen(port, () => {
  console.log(
    `[server]: Server is running at http://localhost:${port} in ${mode} mode`
  );
});
