import dotenv, { DotenvConfigOptions } from "dotenv";
import path from "path";
import { GetApplicationMode } from "../utils/mode.util.js";
import { GetRootDir } from "../utils/filedir.util.js";

const mode = GetApplicationMode();

export default function EnvInit() {
  const config: DotenvConfigOptions = {};

  if (mode === "production") {
    config.path = path.resolve(GetRootDir(), ".env");
  } else {
    config.path = path.resolve(GetRootDir(), ".env.local");
  }

  return dotenv.config(config);
}
