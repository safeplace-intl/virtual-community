import "reflect-metadata";

import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => Int)
  id!: number;

  @Field()
  email!: string;

  @Field()
  passwordHash!: string;

  @Field()
  isActive!: boolean;
}
