import { PrismaClient, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { IncomingMessage } from "http";
import * as jwt from "jsonwebtoken";

import { DecodedAuthHeaderPayload } from "./core/dto/auth.dto.js";
import { prisma } from "./prisma/index.js";

// ! This file isn't doing anything right now.

export interface Context {
  prisma: PrismaClient;
  user?: User;
}

export async function context({
  req,
}: {
  req: IncomingMessage;
}): Promise<Context> {
  const authPayload = await decodeAuthHeader(req.headers.authorization || "");

  let user;
  if (authPayload) {
    user = await prisma.user.findUnique({
      where: {
        id: authPayload.userId,
      },
    });
  }

  if (!user)
    throw new GraphQLError("you must be logged in to query this schema", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });

  return {
    prisma,
    user,
  };
}

async function decodeAuthHeader(authHeader: string) {
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new Error("No token provided.");
  }

  return jwt.verify(
    token,
    String(process.env.JWT_SECRET)
  ) as DecodedAuthHeaderPayload;
}
