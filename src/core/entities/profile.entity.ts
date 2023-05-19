import { ClassType, Field, ObjectType, registerEnumType } from "type-graphql";

export enum PrivacyOption {
  Public = "public",
  Friends = "friends",
  Private = "private",
}

registerEnumType(PrivacyOption, {
  name: "PrivacyOption",
});

// @ObjectType()
// export class ProfileField {
//   @Field(() => PrivacyOption)
//   visibleTo!: PrivacyOption;
//   @Field()
//   value!: string;
// }

// @InputType()
// export class ProfileFieldInput {
//   @Field(() => PrivacyOption, { nullable: true })
//   visibleTo!: PrivacyOption;

//   @Field()
//   value!: string;
// }

export function ProfilePrivacyField<T>(TClass: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class ProfileFieldAbstract {
    @Field(() => TClass)
    value!: T;

    @Field()
    visibleTo!: string;
  }
  return ProfileFieldAbstract;
}

@ObjectType()
export class StringProfileField extends ProfilePrivacyField(String) {
  constructor() {
    super();
  }
}

@ObjectType()
export class NumberProfileField extends ProfilePrivacyField(Number) {
  constructor() {
    super();
  }
}

@ObjectType()
export class BooleanProfileField extends ProfilePrivacyField(Boolean) {
  constructor() {
    super();
  }
}
@ObjectType()
export class Profile {
  @Field()
  id!: number;

  @Field()
  userId!: number;

  @Field(() => StringProfileField)
  fullName!: StringProfileField;

  @Field(() => StringProfileField)
  pronouns!: StringProfileField;

  @Field(() => NumberProfileField)
  tdaGradYear!: NumberProfileField;

  @Field(() => StringProfileField)
  currentLocation!: StringProfileField;

  @Field(() => StringProfileField)
  bio!: StringProfileField;

  @Field(() => StringProfileField, { nullable: true })
  profilePic?: StringProfileField;

  @Field(() => StringProfileField, { nullable: true })
  homeCountry?: StringProfileField;

  @Field(() => StringProfileField, { nullable: true })
  nickname?: StringProfileField;

  @Field(() => StringProfileField, { nullable: true })
  namePronunciation?: StringProfileField;

  @Field(() => StringProfileField, { nullable: true })
  website?: StringProfileField;

  @Field(() => BooleanProfileField, { nullable: true })
  tdaGradYearBannerVisible?: BooleanProfileField;
}
