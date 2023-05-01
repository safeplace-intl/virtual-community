import "reflect-metadata";

import { IsEmail, Length } from "class-validator";
import { ArgsType, Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(8, 255)
  password!: string;

  @Field()
  @Length(1, 255)
  fullName!: string;

  @Field()
  pronouns!: string;
}

@ArgsType()
export class GetUserArgs {
  @Field()
  userId!: number;
}
