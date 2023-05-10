import "reflect-metadata";

import { IsEmail, IsStrongPassword, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  password!: string;

  @Field()
  fullName!: string;

  @Field()
  pronouns!: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(8, 53)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  newPassword!: string;
}

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(8, 53)
  oldPassword!: string;

  @Field()
  @Length(8, 53)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  newPassword!: string;
}
