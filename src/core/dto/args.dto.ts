import "reflect-metadata";

import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  skip = 0;

  @Field(() => Int)
  take = 25;
}
