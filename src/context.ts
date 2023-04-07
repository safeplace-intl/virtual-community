import { PrismaClient } from "@prisma/client";
import { decodeAuthHeader } from "./utils/auth-header.util.js";
import { IncomingMessage } from "http";
import { prisma } from "./prisma/index.js";

export interface Context {
  prisma: PrismaClient;
  userId?: number;
}

export async function context({ req }: { req: IncomingMessage }) {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;

  return {
    prisma,
    userId: token?.userId,
  };
}
