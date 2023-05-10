import "reflect-metadata";

import { Length, Max, Min } from "class-validator";
import { Field, InputType } from "type-graphql";

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
  @Field({ nullable: true })
  @Length(1, 100)
  fullName?: string;

  @Field({ nullable: true })
  @Length(1, 15)
  pronouns?: string;

  @Field({ nullable: true })
  @Min(2015)
  @Max(2050)
  tdaGradYear?: number;

  @Field({ nullable: true })
  @Length(1, 100)
  currentLocation?: string;

  @Field({ nullable: true })
  @Length(1, 500)
  bio?: string;

  @Field({ nullable: true })
  profilePic?: string;

  @Field({ nullable: true })
  @Length(1, 100)
  homeCountry?: string;

  @Field({ nullable: true })
  @Length(1, 100)
  nickname?: string;

  @Field({ nullable: true })
  @Length(1, 100)
  website?: string;

  @Field({ nullable: true })
  tdaGradYearBannerVisible?: boolean;
}
