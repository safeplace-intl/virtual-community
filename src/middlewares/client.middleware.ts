import express, { Request, Response } from "express";
import { GetApplicationMode } from "@utils/mode.util";
import { GetBuildClientDir, GetClientRootDir } from "@utils/filedir.util";
import path from "path";

// serve static assets
export function ServeClientStaticAssets() {
  const mode = GetApplicationMode();
  const staticPaths: string[] = [];

  if (mode === "production") {
    staticPaths.push(GetBuildClientDir());
  } else {
    staticPaths.push(path.resolve(__dirname, "..", "client", "public"));
    staticPaths.push(path.resolve(__dirname, "..", "client"));
  }

  return staticPaths.map((path) => express.static(path));
}

// serve client
export function ServeClient(_: Request, res: Response) {
  const mode = GetApplicationMode();
  let clientPath = "";

  if (mode === "production") {
    clientPath = path.resolve(GetBuildClientDir(), "index.dist.html");
  } else {
    clientPath = path.resolve(GetClientRootDir(), "index.html");
  }

  res.sendFile(clientPath);
}

export default {};
