import { buildSchemaSync } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver.js";

export const schema = buildSchemaSync({
  resolvers: [UserResolver],
});

// console.log(schema);
