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

  @Field({ nullable: true })
  profilePic?: string;

  @Field({ nullable: true })
  homeCountry?: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  namePronunciation?: string;

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  tdaGradYearBannerVisible?: boolean;
}
