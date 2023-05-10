import { GraphQLError } from "graphql";
import { type Context } from "src/context.js";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
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
    @Ctx() ctx: Context
  ) {
    const userId = ctx.user?.id;

    if (!userId) {
      throw new GraphQLError("User not found");
    } else {
      const profile = await this.profileService.updateProfile(
        userId,
        profileInput
      );
      return profile;
    }
  }
}
