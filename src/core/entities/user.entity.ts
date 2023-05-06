import "reflect-metadata";

import { Field, Int, ObjectType } from "type-graphql";

import { Profile } from "./profile.entity.js";

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

  @Field(() => Profile)
  Profile?: Profile;
}

// we need an full list
export type Pronouns = "he/him" | "she/her" | "they/them" | "ze/zir";
