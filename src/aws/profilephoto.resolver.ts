import { GraphQLError } from "graphql";
import { type Context } from "src/context.js";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import ProfilePhotoService from "./profile-image.service.js";

// ! This will be for testing only. We won't actually need a resolver here, this is still part of the profile. So profile.service will have a dependency of the profile-photo-service, and it will call the service from there

@Service()
@Resolver()
export class ProfilePhotoResolver {
  constructor(private readonly ProfilePhotoService: ProfilePhotoService) {}
  @Query(() => String)
  async getS3SignedUrl(@Ctx() ctx: Context) {
    const userId = ctx.user?.id;
    if (!userId) {
      throw new GraphQLError("User not found");
    } else {
      const signedUrl =
        await this.ProfilePhotoService.generateSignedUrlByUserId(userId);

      return signedUrl;
    }
  }

  @Query(() => String)
  async getProfilePhotoByUserId(
    @Ctx() ctx: Context,
    @Arg("userId") userId: number
  ) {
    const validUserId = ctx.user?.id;
    if (!validUserId) {
      throw new GraphQLError("Invalid user making query");
    } else {
      const imageStr = await this.ProfilePhotoService.getImageByUserId(userId);
      return imageStr;
    }
  }
}
