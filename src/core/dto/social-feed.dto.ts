import "reflect-metadata";

import { Allow } from "class-validator";
import { Field, InputType, Int, ObjectType } from "type-graphql";

import { PrivacyOption } from "../entities/profile.entity.js";

@InputType()
export class CreatePostInput {
  @Allow() // bypassing validation temporarily
  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  isDraft?: boolean;

  @Field({ nullable: true })
  hasSensitiveTopic?: boolean;

  @Field(() => PrivacyOption, { nullable: true })
  visibleTo?: PrivacyOption;
}

@InputType()
export class UpdatePostInput {
  @Allow() // bypassing validation temporarily
  @Field()
  postId!: number;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  hasSensitiveTopic?: boolean;

  @Field({ nullable: true })
  likes?: number;

  @Field({ nullable: true })
  dislikes?: number;

  @Field({ nullable: true })
  isDraft?: boolean;

  @Field({ nullable: true })
  visibleTo?: PrivacyOption;
}

@ObjectType()
export class PostDeletedResponse {
  @Field()
  statusCode!: number;

  @Field()
  message!: string;
}

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  content!: string;

  @Field(() => Int)
  postId!: number;
}
