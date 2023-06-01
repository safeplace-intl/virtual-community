import { Field, Int, ObjectType } from "type-graphql";

import { PrivacyOption } from "./profile.entity.js";
import { User } from "./user.entity.js";

@ObjectType()
export class Post {
  @Field()
  id!: number;

  @Field()
  userId!: number;

  @Field(() => User)
  user!: User;

  @Field(() => String)
  content!: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Int, { defaultValue: 0 })
  likes!: number;

  @Field(() => Int, { defaultValue: 0 })
  dislikes!: number;

  @Field(() => Boolean, { defaultValue: false })
  isDraft!: boolean;

  @Field(() => Boolean, { defaultValue: false })
  hasSensitiveTopic!: boolean;

  @Field(() => PrivacyOption, { defaultValue: PrivacyOption.Community })
  visibleTo!: PrivacyOption;
}
