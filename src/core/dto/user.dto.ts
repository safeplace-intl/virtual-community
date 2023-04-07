import "reflect-metadata";
import { Field, ObjectType } from "type-graphql";
import { User } from "../entities/user.entity";
import { AuthPayload } from "./auth.dto";

@ObjectType()
export class CreateUserInput extends User {
  @Field()
  password!: string;

  @Field()
  confirmPassword!: string;
}

@ObjectType()
export class CreateUserResult extends User {
  @Field(() => AuthPayload)
  authPayload!: AuthPayload;
}
