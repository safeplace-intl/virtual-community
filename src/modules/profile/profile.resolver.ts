import { GraphQLError } from "graphql";
import { type Context } from "src/context.js";
import { Arg, Ctx, Float, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { S3Response, UpdateProfileInput } from "../../core/dto/profile.dto.js";
import { Profile } from "../../core/entities/profile.entity.js";
import ProfileService from "./profile.service.js";

@Service()
@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  // @Mutation(() => Profile)
  // async updateProfile(
  //   @Arg("updateProfileInput") profileInput: UpdateProfileInput,
  //   @Ctx() ctx: Context
  // ) {
  //   const userId = ctx.user?.id;

  //   if (!userId) {
  //     throw new GraphQLError("User not found");
  //   } else {
  //     const profile = await this.profileService.updateProfile(
  //       userId,
  //       profileInput
  //     );

  //     if (!profile) {
  //       throw new GraphQLError("Profile not found");
  //     }

  //     return profile;
  //   }
  // }

  // Temporarily mutation without context
  @Mutation(() => Profile)
  async updateProfile(
    @Arg("userId", () => Float) userId: number,
    @Arg("updateProfileInput") profileInput: UpdateProfileInput
  ) {
    const profile = await this.profileService.updateProfile(
      userId,
      profileInput
    );
    console.log(profile);
    console.log("profile.resolver");

    if (!profile) {
      throw new GraphQLError("Profile not found");
    }

    return profile;
  }

  @Query(() => S3Response)
  async getS3SignedUrl(@Ctx() ctx: Context) {
    const userId = ctx.user?.id;
    if (!userId) {
      throw new GraphQLError("User not found");
    } else {
      const signedUrl = await this.profileService.getS3Url(userId);

      return signedUrl;
    }
  }
}
