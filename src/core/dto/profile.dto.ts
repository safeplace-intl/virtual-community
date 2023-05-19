import "reflect-metadata";

// import { Length, Max, Min } from "class-validator";
import { Field, InputType } from "type-graphql";

import {
  BooleanProfileFieldInput,
  NumberProfileFieldInput,
  StringProfileFieldInput,
} from "../entities/profile.entity.js";

// import { StringScalar } from "../../utils/scalars/string-sanitizer.util.js";

// not using decorators here because we don't want to expose this type to the schema
export class CreateProfileInput {
  fullName!: StringProfileFieldInput;
  pronouns!: StringProfileFieldInput;
  tdaGradYear!: NumberProfileFieldInput;
  currentLocation!: StringProfileFieldInput;
  bio!: StringProfileFieldInput;
}
// WITH decorators
// @InputType()
// export class CreateProfileInput {
//   @Field(() => ProfileFieldInput)
//   fullName!: ProfileFieldInput;

//   @Field(() => ProfileFieldInput)
//   pronouns!: ProfileFieldInput;

//   @Field(() => ProfileFieldInput)
//   tdaGradYear!: ProfileFieldInput;

//   @Field(() => ProfileFieldInput)
//   currentLocation!: ProfileFieldInput;

//   @Field(() => ProfileFieldInput)
//   bio!: ProfileFieldInput;
// }

@InputType()
export class UpdateProfileInput {
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
  website?: StringProfileFieldInput;

  @Field(() => BooleanProfileFieldInput, { nullable: true })
  tdaGradYearBannerVisible?: BooleanProfileFieldInput;
}
