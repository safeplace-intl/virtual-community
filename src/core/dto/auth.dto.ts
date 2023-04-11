import { Field, InputType, ObjectType } from "type-graphql";
import "reflect-metadata";

@ObjectType()
export class AuthPayload {
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
export class AuthTokenPayload {
  @Field()
  userId!: number;
}
