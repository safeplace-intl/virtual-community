import { buildSchema } from "type-graphql";
import { Container } from "typedi";

import { PaginationArgs } from "./core/dto/args.dto.js";
import {
  AuthPayload,
  LoginInput,
  RefreshTokenInput,
  TokensPayload,
} from "./core/dto/auth.dto.js";
import { CreateUserInput } from "./core/dto/user.dto.js";
import { AuthResolver } from "./modules/auth/auth.resolver.js";
import { UserResolver } from "./modules/user/user.resolver.js";

// the types and resolvers specified here are what will be auto-generated in the graphql schema file
export const schema = await buildSchema({
  resolvers: [AuthResolver, UserResolver],
  orphanedTypes: [
    LoginInput,
    TokensPayload,
    AuthPayload,
    RefreshTokenInput,
    CreateUserInput,
    PaginationArgs,
  ],
  emitSchemaFile: true,
  dateScalarMode: "isoDate",
  container: Container, // this is needed to inject services into resolvers
  validate: false, // turns off the built in validation
});

// dont forget to also update prisma schema file and run prisma migrate to keep all schemas current
