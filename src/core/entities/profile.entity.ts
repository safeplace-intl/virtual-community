import {
  ClassType,
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from "type-graphql";

export enum PrivacyOption {
  Community = "community",
  Friends = "friends",
  Groups = "groups",
}

registerEnumType(PrivacyOption, {
  name: "PrivacyOption",
});

export function ProfilePrivacyField<T>(TClass: ClassType<T>) {
  @ObjectType()
  abstract class ProfileFieldAbstract {
    @Field(() => TClass)
    value!: T;

    @Field(() => PrivacyOption)
    visibleTo!: PrivacyOption;
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

@InputType()
export class StringProfileFieldInput {
  @Field()
  value!: string;

  @Field(() => PrivacyOption)
  visibleTo!: PrivacyOption;
}

@InputType()
export class NumberProfileFieldInput {
  @Field()
  value!: number;

  @Field(() => PrivacyOption)
  visibleTo!: PrivacyOption;
}

@InputType()
export class BooleanProfileFieldInput {
  @Field()
  value!: boolean;

  @Field(() => PrivacyOption)
  visibleTo!: PrivacyOption;
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
