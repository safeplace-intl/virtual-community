import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Profile {
  @Field()
  id!: number;
  userId!: number;
  fullName!: string;
  pronouns!: string;
  tdaGradYear!: number;
  currentLocation!: string;
  bio!: string;
  profilePic?: string;
  homeCountry?: string;
  nickname?: string;
  namePronunciation?: string;
  website?: string;
  tdaGradYearBannerVisible?: boolean;
}
