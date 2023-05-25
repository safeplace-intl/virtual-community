import "reflect-metadata";

import {
  IsEmail,
  IsInt,
  IsJWT,
  IsNotEmpty,
  IsStrongPassword,
  Length,
} from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

import { User } from "../entities/user.entity.js";

interface StrongPasswordOptions {
  minLength?: number;
  minLowercase?: number;
  minUppercase?: number;
  minNumbers?: number;
  minSymbols?: number;
}

export const defaultPasswordOpts: StrongPasswordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

@ObjectType()
export class TokensPayload {
  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(8, 53)
  password!: string;
}

@ObjectType()
export class DecodedAuthHeaderPayload {
  @Field()
  userId!: number;
}

@ObjectType()
export class AuthPayload {
  @Field(() => TokensPayload)
  tokens!: TokensPayload;

  @Field(() => User)
  user!: User;
}

@InputType()
export class RefreshTokenInput {
  @Field()
  @IsJWT()
  refreshToken!: string;

  @Field()
  @IsInt()
  userId!: number;
}

@ObjectType()
export class AccountResponse {
  @Field()
  statusCode!: number;

  @Field()
  message!: string;
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
