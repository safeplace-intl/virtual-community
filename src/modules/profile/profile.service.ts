import { Prisma, Profile } from "@prisma/client";
import { Service } from "typedi";

import {
  CreateProfileInput,
  UpdateProfileInput,
} from "../../core/dto/profile.dto.js";
import { prisma } from "../../prisma/index.js";
import ProfileImageService from "./profile-image.service.js";

@Service()
export default class ProfileService {
  constructor(private readonly imageService: ProfileImageService) {}

  async getProfileByUserId(userId: number): Promise<Profile> {
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error("Profile not found");
    } else {
      return profile;
    }
  }

  async createProfile(
    userId: number,
    profileInput: CreateProfileInput
  ): Promise<Profile> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const { fullName, pronouns, tdaGradYearBannerVisible } = profileInput;

    if (!user) {
      throw new Error("User not found");
    } else {
      return await prisma.profile.create({
        data: {
          userId: userId,
          fullName: fullName as unknown as Prisma.JsonObject,
          pronouns: (pronouns as unknown as Prisma.JsonObject) || undefined,
          tdaGradYearBannerVisible:
            tdaGradYearBannerVisible as unknown as Prisma.JsonObject,
        },
      });
    }
  }

  async updateProfile(
    userId: number,
    profileUpdateInput: UpdateProfileInput
  ): Promise<Profile | undefined> {
    // ! in here, if profilePic is a field being updated, DO SOME WORK, then we need to call the image service to either create a new profile image, update the image in S3, or delete
    // ! are we storing a url reference in the DB or do we need to call getImage everytime the user profile is resolved?
    console.log(profileUpdateInput);
    if (
      // Delete is the only time that the image service needs to be called
      "profilePic" in profileUpdateInput &&
      profileUpdateInput["profilePic"] == null
    ) {
      const response = this.imageService.deleteImageByUserId(userId);
      console.log(response);
      const {
        fullName,
        pronouns,
        tdaGradYear,
        currentLocation,
        bio,
        profilePic,
        homeCountry,
        nickname,
        namePronunciation,
        website,
        tdaGradYearBannerVisible,
      } = profileUpdateInput;

      const existingProfile = await prisma.profile.findUnique({
        where: { userId },
      });

      if (!existingProfile) {
        throw new Error("Profile not found");
      }

      const profile = await prisma.profile.update({
        where: { userId },
        data: {
          fullName: fullName as unknown as Prisma.JsonObject,
          pronouns: pronouns as unknown as Prisma.JsonObject,
          tdaGradYear: tdaGradYear as unknown as Prisma.JsonObject,
          currentLocation: currentLocation as unknown as Prisma.JsonObject,
          bio: bio as unknown as Prisma.JsonObject,
          tdaGradYearBannerVisible:
            tdaGradYearBannerVisible as unknown as Prisma.JsonObject,
          profilePic: profilePic as unknown as Prisma.JsonObject,
          homeCountry: homeCountry as unknown as Prisma.JsonObject,
          nickname: nickname as unknown as Prisma.JsonObject,
          namePronunciation: namePronunciation as unknown as Prisma.JsonObject,
          website: website as unknown as Prisma.JsonObject,
        },
      });

      return profile;
    }
  }

  async getS3Url(userId: number) {
    return await this.imageService.generateSignedUrlByUserId(userId);
  }
}
