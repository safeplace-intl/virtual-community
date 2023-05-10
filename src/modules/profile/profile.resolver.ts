import { Arg, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";

import { UpdateProfileInput } from "../../core/dto/profile.dto.js";
import { Profile } from "../../core/entities/profile.entity.js";
import ProfileService from "./profile.service.js";

@Service()
@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  async updateProfile(
    @Arg("updateProfileInput") profileInput: UpdateProfileInput,
    @Arg("userId") userId: number
  ) {
    const profile = await this.profileService.updateProfile(
      userId,
      profileInput
    );

    return profile;
  }
}
