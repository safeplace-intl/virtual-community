import express, { Express, Request, Response } from "express";
import GeneralMiddleware from "@middleware/general.middleware";
import { GetApplicationMode } from "@utils/mode.util";
import {
  ServeClient,
  ServeClientStaticAssets,
} from "@middleware/client.middleware";
import EnvInit from "@middleware/env.middleware";

// initialize server variables
EnvInit();
const port = process.env.PORT || 3000;
const mode = GetApplicationMode();
const server: Express = express();

//intialize server
server.use(ServeClientStaticAssets());
server.use(GeneralMiddleware);

// sample api route
server.get("/api/v1", (_: Request, res: Response) => {
  res.json("Hello world!");
});

// serving client and listening on port
server.use("/", ServeClient);
server.listen(port, () => {
  console.log(
    `[server]: Server is running at http://localhost:${port} in ${mode} mode`
  );
});
