import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import {
  CreateProfileInput,
  UpdateProfileInput,
} from "../../core/dto/profile.dto.js";
import { Profile } from "../../core/entities/profile.entity.js";
import ProfileService from "./profile.service.js";

@Service()
@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { nullable: true })
  async getProfile(@Arg("userId") userId: number) {
    const profile = await this.profileService.getProfileByUserId(userId);
    return profile;
  }

  @Mutation(() => Profile)
  async createProfile(
    @Arg("createProfileInput") profileInput: CreateProfileInput,
    @Arg("userId") userId: number
  ): Promise<Profile> {
    const profile = await this.profileService.createProfile(
      userId,
      profileInput
    );

    return profile;
  }

  @Mutation(() => Profile)
  async updateProfile(
    @Arg("updateProfileInput") profileInput: UpdateProfileInput,
    @Arg("userId") userId: number
  ): Promise<Profile> {
    const profile = await this.profileService.updateProfile(
      userId,
      profileInput
    );

    return profile;
  }
}
