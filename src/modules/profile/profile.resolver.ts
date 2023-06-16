import { GraphQLError } from "graphql";
import { type Context } from "src/context.js";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";

import {
  S3MessageResponse,
  S3SignedUrlResponse,
  UpdateProfileInput,
} from "../../core/dto/profile.dto.js";
import { Profile } from "../../core/entities/profile.entity.js";
import ProfileService from "./profile.service.js";
import ProfileImageService from "./profile-image.service.js";

@Service()
@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly imageService: ProfileImageService
  ) {}

  @Mutation(() => Profile)
  async updateProfile(
    @Arg("updateProfileInput") updateProfileInput: UpdateProfileInput,
    @Ctx() ctx: Context
  ) {
    const userId = ctx.user?.id;

    if (!userId) {
      throw new GraphQLError("User not found");
    } else {
      const profile = await this.profileService.updateProfile(
        userId,
        updateProfileInput
      );

      if (!profile) {
        throw new GraphQLError("Profile not found");
      }

      return profile;
    }
  }

  @Query(() => S3SignedUrlResponse)
  async getS3SignedUrl(@Ctx() ctx: Context) {
    const userId = ctx.user?.id;
    if (!userId) {
      throw new GraphQLError("User not found");
    } else {
      const signedUrl = await this.imageService.generateSignedUrlByUserId(
        userId
      );

      const filename = signedUrl.hashedFileName;
      await this.profileService.transferProfileImageFileName(userId, filename);

      return signedUrl;
    }
  }

  @Query(() => S3MessageResponse)
  async deleteProfileImageAndRestoreDefault(@Ctx() ctx: Context) {
    const userId = ctx.user?.id;
    if (!userId) {
      throw new GraphQLError("User not found");
    } else {
      const profile = await this.profileService.getProfileByUserId(userId);

      if (!profile || !profile.profilePic) {
        throw new GraphQLError("Profile not found");
      }

      const imageKey = profile.profilePic.toString();

      const message = await this.imageService.deleteImageByUserId(
        userId,
        imageKey
      );

      await this.profileService.restoreDefaultProfileImage(userId);

      return message;
    }
  }

  @FieldResolver(() => String, { nullable: true })
  async profileImage(@Root() profile: Profile) {
    const key = profile.profilePic?.value as string;

    if (!key) {
      return null;
    }

    const image = await this.imageService.getImageByUserId(profile.userId, key);

    return image.message;
  }
}
