import "reflect-metadata";

import { Length, Max, Min } from "class-validator";
import { Field, InputType } from "type-graphql";

import {
  BooleanProfileField,
  NumberProfileField,
  StringProfileField,
} from "../entities/profile.entity.js";

// import { StringScalar } from "../../utils/scalars/string-sanitizer.util.js";
// import { ProfileFieldInput } from "../entities/profile.entity.js";
// import { ProfileField } from "../entities/profile.entity.js";

// not using decorators here because we don't want to expose this type to the schema
export class CreateProfileInput {
  fullName!: StringProfileField;
  pronouns!: StringProfileField;
  tdaGradYear!: NumberProfileField;
  currentLocation!: StringProfileField;
  bio!: StringProfileField;
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

// @InputType()
// export class UpdateProfileInput {
//   @Field(() => ProfileField, { nullable: true })
//   @Length(1, 100)
//   fullName?: ProfileField;

//   @Field(() => ProfileField, { nullable: true })
//   @Length(1, 15)
//   pronouns?: ProfileField;

//   @Field(() => ProfileField, { nullable: true })
//   @Min(2015)
//   @Max(2050)
//   tdaGradYear?: ProfileField;

//   @Field(() => ProfileField, { nullable: true })
//   @Length(1, 100)
//   currentLocation?: ProfileField;

//   @Field(() => ProfileField, { nullable: true })
//   @Length(1, 500)
//   bio?: ProfileField;

//   @Field(() => ProfileField, { nullable: true })
//   profilePic?: ProfileField;

//   @Field(() => ProfileField, { nullable: true })
//   @Length(1, 100)
//   homeCountry?: ProfileField;

//   @Field(() => ProfileField, { nullable: true })
//   @Length(1, 100)
//   nickname?: ProfileField;

//   @Field(() => ProfileField, { nullable: true })
//   @Length(1, 100)
//   website?: ProfileField;

//   @Field(() => ProfileField, { nullable: true })
//   tdaGradYearBannerVisible?: ProfileField;
// }
@InputType()
export class UpdateProfileInput {
  @Field(() => StringProfileField, { nullable: true })
  @Length(1, 100)
  fullName?: StringProfileField;

  @Field(() => StringProfileField, { nullable: true })
  @Length(1, 15)
  pronouns?: StringProfileField;

  @Field(() => NumberProfileField, { nullable: true })
  @Min(2015)
  @Max(2050)
  tdaGradYear?: NumberProfileField;

  @Field(() => StringProfileField, { nullable: true })
  @Length(1, 100)
  currentLocation?: StringProfileField;

  @Field(() => StringProfileField, { nullable: true })
  @Length(1, 500)
  bio?: StringProfileField;

  @Field(() => StringProfileField, { nullable: true })
  profilePic?: StringProfileField;

  @Field(() => StringProfileField, { nullable: true })
  @Length(1, 100)
  homeCountry?: StringProfileField;

  @Field(() => StringProfileField, { nullable: true })
  @Length(1, 100)
  nickname?: StringProfileField;

  @Field(() => StringProfileField, { nullable: true })
  @Length(1, 100)
  website?: StringProfileField;

  @Field(() => BooleanProfileField, { nullable: true })
  tdaGradYearBannerVisible?: BooleanProfileField;
}
