import { buildSchema } from "type-graphql";
import { Container } from "typedi";

import { AuthResolver } from "./modules/auth/auth.resolver.js";
import { ProfileResolver } from "./modules/profile/profile.resolver.js";
import { CommentResolver } from "./modules/social-feed/comment/comment.resolver.js";
import { PostResolver } from "./modules/social-feed/post/post.resolver.js";
import { UserResolver } from "./modules/user/user.resolver.js";

// the types and resolvers specified here are what will be auto-generated in the graphql schema file
export const schema = await buildSchema({
  resolvers: [
    AuthResolver,
    ProfileResolver,
    UserResolver,
    PostResolver,
    CommentResolver,
  ],
  orphanedTypes: [],
  emitSchemaFile: true,
  dateScalarMode: "isoDate",
  container: Container, // this is needed to inject services into resolvers
  validate: true,
});

// dont forget to also update prisma schema file and run prisma migrate to keep all schemas current
