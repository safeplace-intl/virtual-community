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
  fullName!: string;

  @Field()
  pronouns!: string;
}

@ArgsType()
export class GetUserArgs {
  @Field()
  userId!: number;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  email!: string;

  @Field()
  newPassword!: string;
}
