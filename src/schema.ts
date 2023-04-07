import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver.js";

export const schema = await buildSchema({
  resolvers: [UserResolver],
  emitSchemaFile: true,
});
