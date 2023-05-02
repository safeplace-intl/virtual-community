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
  profilePic: string | null | undefined;
  homeCountry: string | null | undefined;
  nickname: string | null | undefined;
  namePronunciation: string | null | undefined;
  website: string | null | undefined;
  tdaGradYearBannerVisible?: boolean;
}
