import { buildSchema } from "type-graphql";
import { Container } from "typedi";

import { PaginationArgs } from "./core/dto/args.dto.js";
import { AuthPayload, LoginInput, TokenPayload } from "./core/dto/auth.dto.js";
import { CreateUserInput } from "./core/dto/user.dto.js";
import { AuthResolver } from "./modules/auth/auth.resolver.js";
import { UserResolver } from "./modules/user/user.resolver.js";

export const schema = await buildSchema({
  resolvers: [UserResolver, AuthResolver],
  orphanedTypes: [
    LoginInput,
    TokenPayload,
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
