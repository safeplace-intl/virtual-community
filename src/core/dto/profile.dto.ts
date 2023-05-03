import "reflect-metadata";

import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

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

  @Field(() => String, { nullable: true })
  profilePic: string | null | undefined;

  @Field(() => String, { nullable: true })
  homeCountry: string | null | undefined;

  @Field(() => String, { nullable: true })
  nickname: string | null | undefined;

  @Field(() => String, { nullable: true })
  website: string | null | undefined;

  @Field()
  tdaGradYearBannerVisible!: boolean;
}
