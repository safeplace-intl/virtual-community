import "reflect-metadata";

import { IsEmail, IsInt, IsJWT, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

import { User } from "../entities/user.entity.js";

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
