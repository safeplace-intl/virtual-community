import "reflect-metadata";

import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

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

@InputType()
export class ResetPasswordInput {
  @Field()
  email!: string;

  @Field()
  newPassword!: string;
}
