import express, { Express, Request, Response } from "express";
import GeneralMiddleware from "@middleware/general.middleware";
import { GetApplicationMode } from "@utils/mode.util";
import {
  ServeClient,
  ServeClientStaticAssets,
} from "@middleware/client.middleware";
import EnvInit from "@middleware/env.middleware";

import { PrismaClient } from "@prisma/client";

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
  // const user = await prisma.user.create({
  //   data: {
  //     name: "Eleni",
  //     email: "eleni1@test.com",
  //   },
  // });
  // console.log(user);
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

// serving client and listening on port
server.use("/", ServeClient);
server.listen(port, () => {
  console.log(
    `[server]: Server is running at http://localhost:${port} in ${mode} mode`
  );
});
