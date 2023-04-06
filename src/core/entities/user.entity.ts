import { Field, ObjectType } from "type-graphql";
import "reflect-metadata";

@ObjectType()
export class User {
  @Field()
  id!: number;

  @Field()
  name?: string;

  @Field()
  email!: string;
}
