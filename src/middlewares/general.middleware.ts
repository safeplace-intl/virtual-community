import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { GetApplicationMode } from "../utils/mode.util.js";

const mode = GetApplicationMode();

// logging middleware using morgan lib
function logger() {
  if (mode === "production") {
    return morgan("combined");
  }
  return morgan("dev");
}

export default [
  helmet(),
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
  logger(),
];
