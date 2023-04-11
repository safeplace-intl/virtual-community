import "reflect-metadata";
import { ArgsType, Field, InputType } from "type-graphql";
import { User } from "../entities/user.entity.js";

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  email!: string;

  @Field()
  fullName!: string;

  @Field()
  pronouns!: string;

  @Field()
  password!: string;
}

@ArgsType()
export class GetUserArgs {
  @Field()
  userId!: number;
}
