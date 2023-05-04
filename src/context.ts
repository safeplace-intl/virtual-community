import { BaseContext } from "@apollo/server";
import * as jwt from "jsonwebtoken";

import { DecodedAuthHeaderPayload } from "./core/dto/auth.dto.js";

export interface Context extends BaseContext {
  token?: string;
}

export async function decodeAuthHeader(authHeader: string) {
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new Error("No token provided.");
  }

  return jwt.verify(
    token,
    String(process.env.JWT_SECRET)
  ) as DecodedAuthHeaderPayload;
}
