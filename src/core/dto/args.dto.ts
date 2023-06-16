import { createIntScalar } from "graphql-scalar";
import { ArgsType, Field, Int } from "type-graphql";

const intScalar = createIntScalar({
  name: "PaginationTake",
  maximum: 100,
});

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  skip = 0;

  @Field(() => intScalar)
  take = 25;
}
