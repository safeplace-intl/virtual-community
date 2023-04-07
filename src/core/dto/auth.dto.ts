import { Field, ObjectType } from "type-graphql";
import "reflect-metadata";
import { User } from "../entities/user.entity";

@ObjectType()
export class LoginInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@ObjectType()
export class LoginResult {
  @Field(() => User)
  user!: User;

  @Field()
  authPayload!: AuthPayload;
}

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;
}

@ObjectType()
export class AuthTokenPayload {
  @Field()
  userId!: number;
}
