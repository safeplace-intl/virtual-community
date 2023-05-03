import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Profile {
  @Field()
  id!: number;
  @Field()
  userId!: number;
  @Field()
  fullName!: string;
  @Field()
  pronouns!: string;
  @Field()
  tdaGradYear!: number;
  @Field()
  currentLocation!: string;
  @Field()
  bio!: string;
  @Field(() => String, { nullable: true })
  profilePic: string | null | undefined;
  @Field(() => String, { nullable: true })
  homeCountry: string | null | undefined;
  @Field(() => String, { nullable: true })
  nickname: string | null | undefined;
  @Field(() => String, { nullable: true })
  namePronunciation: string | null | undefined;
  @Field(() => String, { nullable: true })
  website: string | null | undefined;
  @Field()
  tdaGradYearBannerVisible?: boolean;
}
