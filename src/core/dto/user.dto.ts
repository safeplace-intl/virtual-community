import "reflect-metadata";

import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  Length,
  MaxLength,
} from "class-validator";
import { Field, InputType } from "type-graphql";

import { StringScalar } from "../../utils/scalars/string-sanitizer.util.js";

interface StrongPasswordOptions {
  minLength?: number;
  minLowercase?: number;
  minUppercase?: number;
  minNumbers?: number;
  minSymbols?: number;
}

const defaultPasswordOpts: StrongPasswordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsStrongPassword(defaultPasswordOpts)
  password!: string;

  @Field(() => StringScalar)
  @IsNotEmpty()
  @MaxLength(100)
  fullName!: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(15)
  pronouns!: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(8, 53)
  @IsStrongPassword(defaultPasswordOpts)
  newPassword!: string;
}

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(8, 53)
  @IsNotEmpty()
  oldPassword!: string;

  @Field()
  @Length(8, 53)
  @IsStrongPassword(defaultPasswordOpts)
  newPassword!: string;
}
