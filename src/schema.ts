import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver.js";
import {
  AuthPayload,
  AuthTokenPayload,
  LoginInput,
  LoginResult,
} from "./core/dto/auth.dto.js";
import { CreateUserInput, CreateUserResult } from "./core/dto/user.dto.js";
import { PaginationArgs } from "./core/dto/args.dto.js";

export const schema = await buildSchema({
  resolvers: [UserResolver],
  orphanedTypes: [
    LoginInput,
    LoginResult,
    AuthTokenPayload,
    AuthPayload,
    CreateUserInput,
    CreateUserResult,
    PaginationArgs,
  ],
  emitSchemaFile: true,
  dateScalarMode: "isoDate",
});

// dont forget to update prisma schema file and run prisma migrate to keep all schemas current
