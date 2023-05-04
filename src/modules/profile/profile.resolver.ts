import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { CreateProfileInput, UpdateProfileInput } from "../../core/dto/profile.dto.js";
import { GetUserArgs } from "../../core/dto/user.dto.js";
import { Profile } from "../../core/entities/profile.entity.js";
import ProfileService from "./profile.service.js";

@Service()
@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { nullable: true })
  async getProfile(@Args() params: GetUserArgs) {
    const profile = await this.profileService.getProfileByUserId(params.userId);
    return profile;
  }

  @Mutation(() => Profile)
  async createProfile(
    @Arg("createProfileInput") profileInput: CreateProfileInput,
    @Args() userArgs: GetUserArgs
  ): Promise<Profile> {
    const profile = await this.profileService.createProfile(
      userArgs.userId,
      profileInput
    );

    return profile;
  }

  @Mutation(() => Profile)
  async updateProfile(
    @Arg("updateProfileInput") profileInput: UpdateProfileInput,
    @Args() userArgs: GetUserArgs
  ): Promise<Profile> {
    const profile = await this.profileService.updateProfile(
      userArgs.userId,
      profileInput
    );

    return profile;
  }
}