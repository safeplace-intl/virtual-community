import "reflect-metadata";

import { Field, Int, ObjectType } from "type-graphql";

import {
  //   BooleanProfileField,
  //   NumberProfileField,
  //   ProfilePrivacyField,
  //   ProfilePrivacyFieldInput,
  StringProfileField,
} from "./profile.entity";

@ObjectType()
export class Post {
  @Field(() => Int)
  id!: number;

  @Field()
  userId?: number;

  @Field(() => StringProfileField, { nullable: true })
  content!: StringProfileField;

  @Field()
  image?: string;

  @Field()
  likes!: number;

  @Field()
  dislikes!: number;

  @Field()
  isDraft?: boolean;

  @Field()
  hasSensitiveTopic?: boolean;
}
