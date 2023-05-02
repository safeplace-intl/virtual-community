import "reflect-metadata";

import { Length } from "class-validator";
import { ArgsType, Field, InputType } from "type-graphql";

@InputType()
export class CreateProfileInput {
  @Field()
  @Length(1, 255)
  fullName!: string;

  @Field()
  pronouns!: string;

  @Field()
  tdaGradYear!: number;

  @Field()
  currentLocation!: string;

  @Field()
  @Length(1, 500)
  bio!: string;

  @Field()
  profilePic: string | null | undefined;

  @Field()
  homeCountry: string | null | undefined;

  @Field()
  nickname: string | null | undefined;

  @Field()
  website: string | null | undefined;

  @Field()
  tdaGradYearBannerVisible!: boolean;
}
