import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { UserResolver } from "./modules/user/user.resolver.js";
import {
  AuthPayload,
  AuthTokenPayload,
  LoginInput,
} from "./core/dto/auth.dto.js";
import { CreateUserInput } from "./core/dto/user.dto.js";
import { PaginationArgs } from "./core/dto/args.dto.js";

export const schema = await buildSchema({
  resolvers: [UserResolver],
  orphanedTypes: [
    LoginInput,
    AuthTokenPayload,
    AuthPayload,
    CreateUserInput,
    PaginationArgs,
  ],
  emitSchemaFile: true,
  dateScalarMode: "isoDate",
  container: Container,
  validate: false,
});

// dont forget to update prisma schema file and run prisma migrate to keep all schemas current
