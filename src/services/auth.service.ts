import * as jwt from "jsonwebtoken";
import { AuthTokenPayload } from "src/core/dto/auth.dto";

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new Error("No token provided.");
  }

  return jwt.verify(token, String(process.env.JWT_SECRET)) as AuthTokenPayload;
}
