import { Field, InputType, Int } from "type-graphql";

import { PrivacyOption } from "../entities/profile.entity.js";

@InputType()
export class CreatePostInput {
  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Boolean)
  isDraft?: boolean;

  @Field(() => Boolean)
  hasSensitiveTopic?: boolean;

  @Field(() => PrivacyOption, { defaultValue: PrivacyOption.Community })
  visibleTo?: PrivacyOption;
}

@InputType()
export class UpdatePostInput {
  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Boolean, { nullable: true })
  hasSensitiveTopic?: boolean;

  @Field(() => Int, { nullable: true })
  likes?: number;

  @Field(() => Int, { nullable: true })
  dislikes?: number;

  @Field(() => Boolean, { nullable: true })
  isDraft?: boolean;

  @Field(() => PrivacyOption, { nullable: true })
  visibleTo?: PrivacyOption;
}
