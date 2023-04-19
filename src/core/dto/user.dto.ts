import "reflect-metadata";

import { IsEmail, Length } from "class-validator";
import { ArgsType, Field, InputType } from "type-graphql";

import { type Pronouns, User } from "../entities/user.entity.js";

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  fullName!: string;

  @Field()
  pronouns!: Pronouns;

  @Field()
  @Length(10, 20)
  password!: string;
}

@ArgsType()
export class GetUserArgs {
  @Field()
  userId!: number;
}
