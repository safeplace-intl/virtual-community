import path from "path";

export function GetRootDir() {
  const currentFileUrl = new URL(import.meta.url);
  return path.resolve(currentFileUrl.pathname, "..", "..");
}

export function GetSrcDir() {
  const currentFileUrl = new URL(import.meta.url);
  return path.resolve(currentFileUrl.pathname, "..");
}

export function GetClientRootDir() {
  return path.resolve(GetSrcDir(), "client");
}

export function GetClientSrcDir() {
  return path.resolve(GetClientRootDir(), "src");
}

export function GetBuildDir() {
  return path.resolve(GetRootDir(), "build");
}

export function GetBuildClientDir() {
  return path.resolve(GetBuildDir(), "client", "dist");
}
