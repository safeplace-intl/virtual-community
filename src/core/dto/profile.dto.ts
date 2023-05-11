import "reflect-metadata";

import { Length, Max, Min } from "class-validator";
import { Field, InputType } from "type-graphql";

import { StringScalar } from "../../utils/scalars/string-sanitizer.util.js";

// not using decorators here because we don't want to expose this type to the schema
export class CreateProfileInput {
  fullName!: string;
  pronouns!: string;
  tdaGradYear!: number;
  currentLocation!: string;
  bio!: string;
}

@InputType()
export class UpdateProfileInput {
  @Field(() => StringScalar || String, { nullable: true })
  @Length(1, 100)
  fullName?: string;

  @Field({ nullable: true })
  @Length(1, 15)
  pronouns?: string;

  @Field({ nullable: true })
  @Min(2015)
  @Max(2050)
  tdaGradYear?: number;

  @Field(() => StringScalar || String, { nullable: true })
  @Length(1, 100)
  currentLocation?: string;

  @Field(() => StringScalar || String, { nullable: true })
  @Length(1, 500)
  bio?: string;

  @Field({ nullable: true })
  profilePic?: string;

  @Field(() => StringScalar || String, { nullable: true })
  @Length(1, 100)
  homeCountry?: string;

  @Field(() => StringScalar || String, { nullable: true })
  @Length(1, 100)
  nickname?: string;

  @Field({ nullable: true })
  @Length(1, 100)
  website?: string;

  @Field({ nullable: true })
  tdaGradYearBannerVisible?: boolean;
}
