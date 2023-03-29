import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { GetApplicationMode } from "@utils/mode.util";

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
