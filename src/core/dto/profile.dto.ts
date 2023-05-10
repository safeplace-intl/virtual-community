import "reflect-metadata";

import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

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
  @Length(1, 255)
  fullName?: string;

  @Field({ nullable: true })
  pronouns?: string;

  @Field({ nullable: true })
  tdaGradYear?: number;

  @Field({ nullable: true })
  currentLocation?: string;

  @Field({ nullable: true })
  @Length(1, 500)
  bio?: string;

  @Field({ nullable: true })
  profilePic?: string;

  @Field({ nullable: true })
  homeCountry?: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  tdaGradYearBannerVisible?: boolean;
}
