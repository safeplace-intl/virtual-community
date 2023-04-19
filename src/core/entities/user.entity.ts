import "reflect-metadata";

import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => Int)
  id!: number;

  @Field()
  email!: string;

  @Field()
  fullName!: string;

  @Field()
  pronouns!: string;

  @Field()
  passwordHash!: string;
}

// we need an full list
export type Pronouns = "he/him" | "she/her" | "they/them" | "ze/zir";
