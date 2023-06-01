import { Field, InputType, Int, registerEnumType } from "type-graphql";

import { PrivacyOption } from "../entities/profile.entity.js";
// import { User } from "../entities/user.entity.js";

registerEnumType(PrivacyOption, {
  name: "PrivacyOption",
});
@InputType()
export class UserIdInput {
  @Field(() => Int)
  id!: number;
}
@InputType()
export class CreatePostInput {
  // not sure if we need it, probably not
  //   @Field(() => Int, { nullable: true })
  //   userId?: number;

  // @Field(() => UserIdInput)
  // user!: UserIdInput;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Boolean, { nullable: true })
  hasSensitiveTopic?: boolean;

  @Field(() => PrivacyOption, { defaultValue: PrivacyOption.Community })
  visibleTo!: PrivacyOption;
}

@InputType()
export class UpdatePostInput {
  //   @Field(() => Int)
  //   id!: number;

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
