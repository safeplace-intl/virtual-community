import express, { Request, Response } from "express";
import { GetApplicationMode } from "../utils/mode.util.js";
import { GetBuildClientDir, GetClientRootDir } from "../utils/filedir.util.js";
import path from "path";

// serve static assets
export function ServeClientStaticAssets() {
  const mode = GetApplicationMode();
  const staticPaths: string[] = [];

  const currentFileUrl = new URL(import.meta.url);
  const rootDir = path.resolve(currentFileUrl.pathname, "..");
  const clientDir = path.resolve(rootDir, "client");

  if (mode === "production") {
    staticPaths.push(GetBuildClientDir());
  } else {
    staticPaths.push(path.resolve(clientDir, "public"));
    staticPaths.push(clientDir);
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
