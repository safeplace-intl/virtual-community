import "reflect-metadata";

import { Field, InputType, ObjectType } from "type-graphql";

import { User } from "../entities/user.entity.js";

@ObjectType()
export class TokenPayload {
  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;
}

@InputType()
export class LoginInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@ObjectType()
export class DecodedAuthHeaderPayload {
  @Field()
  userId!: number;
}

@ObjectType()
export class AuthPayload {
  @Field(() => TokenPayload)
  tokens!: TokenPayload;

  @Field(() => User)
  user!: User;
}

@InputType()
export class RefreshTokenInput {
  @Field()
  refreshToken!: string;

  @Field()
  userId!: number;
}
