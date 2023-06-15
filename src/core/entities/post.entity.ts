import { Field, Int, ObjectType } from "type-graphql";

import { PrivacyOption } from "./profile.entity.js";

@ObjectType()
export class Post {
  @Field()
  id!: number;

  @Field()
  userId!: number;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ defaultValue: 0 })
  likes!: number;

  @Field({ defaultValue: 0 })
  dislikes!: number;

  @Field({ defaultValue: false })
  isDraft!: boolean;

  @Field({ defaultValue: false })
  hasSensitiveTopic!: boolean;

  @Field(() => PrivacyOption, { defaultValue: PrivacyOption.Community })
  visibleTo!: PrivacyOption;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
