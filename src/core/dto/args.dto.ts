import { ArgsType, Field, Int } from "type-graphql";
import "reflect-metadata";

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  skip = 0;

  @Field(() => Int)
  take = 25;
}
