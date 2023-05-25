import "reflect-metadata";

import { Allow } from "class-validator";
import { Field, InputType } from "type-graphql";

import {
  BooleanProfileFieldInput,
  NumberProfileFieldInput,
  StringProfileFieldInput,
} from "../entities/profile.entity.js";

// not using decorators here because we don't want to expose this type to the schema
export class CreateProfileInput {
  fullName!: StringProfileFieldInput;
  pronouns?: StringProfileFieldInput;
  tdaGradYearBannerVisible!: BooleanProfileFieldInput;
}

@InputType()
export class UpdateProfileInput {
  @Allow()
  @Field(() => StringProfileFieldInput, { nullable: true })
  fullName?: StringProfileFieldInput;

  @Field(() => StringProfileFieldInput, { nullable: true })
  pronouns?: StringProfileFieldInput;

  @Field(() => NumberProfileFieldInput, { nullable: true })
  tdaGradYear?: NumberProfileFieldInput;

  @Field(() => StringProfileFieldInput, { nullable: true })
  currentLocation?: StringProfileFieldInput;

  @Field(() => StringProfileFieldInput, { nullable: true })
  bio?: StringProfileFieldInput;

  @Field(() => StringProfileFieldInput, { nullable: true })
  profilePic?: StringProfileFieldInput;

  @Field(() => StringProfileFieldInput, { nullable: true })
  homeCountry?: StringProfileFieldInput;

  @Field(() => StringProfileFieldInput, { nullable: true })
  nickname?: StringProfileFieldInput;

  @Field(() => StringProfileFieldInput, { nullable: true })
  namePronunciation?: StringProfileFieldInput;

  @Field(() => StringProfileFieldInput, { nullable: true })
  website?: StringProfileFieldInput;

  @Field(() => BooleanProfileFieldInput, { nullable: true })
  tdaGradYearBannerVisible?: BooleanProfileFieldInput;
}
