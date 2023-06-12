import { buildSchema } from "type-graphql";
import { Container } from "typedi";

import { PaginationArgs } from "./core/dto/args.dto.js";
import {
  AuthPayload,
  LoginInput,
  RefreshTokenInput,
  TokensPayload,
} from "./core/dto/auth.dto.js";
import {
  CreateCommentInput,
  CreatePostInput,
  UpdatePostInput,
} from "./core/dto/social-feed.dto.js";
import { CreateUserInput } from "./core/dto/user.dto.js";
import { Comment } from "./core/entities/comment.entity.js";
import { Post } from "./core/entities/post.entity.js";
import { User } from "./core/entities/user.entity.js";
import { AuthResolver } from "./modules/auth/auth.resolver.js";
import { ProfileResolver } from "./modules/profile/profile.resolver.js";
import { CommentResolver } from "./modules/social-feed/comment/comment.resolver.js";
import { UserResolver } from "./modules/user/user.resolver.js";

// the types and resolvers specified here are what will be auto-generated in the graphql schema file
export const schema = await buildSchema({
  resolvers: [AuthResolver, ProfileResolver, UserResolver, CommentResolver],
  orphanedTypes: [
    LoginInput,
    TokensPayload,
    AuthPayload,
    RefreshTokenInput,
    CreateUserInput,
    PaginationArgs,
    User,
    Post,
    Comment,
    CreatePostInput,
    UpdatePostInput,
    CreateCommentInput,
  ],
  emitSchemaFile: true,
  dateScalarMode: "isoDate",
  container: Container, // this is needed to inject services into resolvers
  validate: true,
});

// dont forget to also update prisma schema file and run prisma migrate to keep all schemas current
