import path from "path";

export function GetRootDir() {
  return path.resolve(__dirname, "..", "..");
}

export function GetSrcDir() {
  return path.resolve(__dirname, "..");
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
