import { Field, Int, ObjectType } from "type-graphql";
import "reflect-metadata";
import { AuthPayload } from "../dto/auth.dto.js";

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

  @Field(() => AuthPayload, { nullable: true })
  authPayload?: AuthPayload;

  @Field({ nullable: true })
  passwordHash?: string;

  @Field({ nullable: true })
  password?: string;
}
