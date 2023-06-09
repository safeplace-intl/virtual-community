import { Prisma, Profile } from "@prisma/client";
import { Service } from "typedi";

import {
  CreateProfileInput,
  UpdateProfileInput,
} from "../../core/dto/profile.dto.js";
import { prisma } from "../../prisma/index.js";

@Service()
export default class ProfileService {
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
  ): Promise<Profile> {
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
