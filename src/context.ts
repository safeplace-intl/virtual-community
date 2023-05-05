import { BaseContext } from "@apollo/server";
import { User } from "@prisma/client";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

import { DecodedAuthHeaderPayload } from "./core/dto/auth.dto.js";

export interface Context extends BaseContext {
  user?: User;
}

export async function decodeAuthHeader(authHeader: string) {
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new GraphQLError("No token provided.");
  }

  const { userId } = jwt.verify(
    token,
    String(process.env.JWT_SECRET)
  ) as DecodedAuthHeaderPayload;

  return userId;
}
