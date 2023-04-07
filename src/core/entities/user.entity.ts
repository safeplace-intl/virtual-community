import { Field, ID, ObjectType } from "type-graphql";
import "reflect-metadata";

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  email!: string;

  @Field()
  fullName!: string;

  @Field()
  pronouns!: string;

  passwordHash!: string;
}
