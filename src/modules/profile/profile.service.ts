import { Profile } from "@prisma/client";
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
    }

    return profile;
  }

  async createProfile(
    userId: number,
    profileInput: CreateProfileInput
  ): Promise<Profile> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const { fullName, pronouns, tdaGradYear, currentLocation, bio } =
      profileInput;

    if (!user) {
      throw new Error("User not found");
    } else {
      return await prisma.profile.create({
        data: {
          userId: userId,
          fullName: JSON.stringify(fullName),
          pronouns: JSON.stringify(pronouns),
          tdaGradYear: JSON.stringify(tdaGradYear),
          currentLocation: JSON.stringify(currentLocation),
          bio: JSON.stringify(bio),
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
      website,
      tdaGradYearBannerVisible,
    } = profileUpdateInput;

    const profile = await prisma.profile.update({
      where: { userId },
      data: {
        fullName: JSON.stringify(fullName),
        pronouns: JSON.stringify(pronouns),
        tdaGradYear: JSON.stringify(tdaGradYear),
        currentLocation: JSON.stringify(currentLocation),
        bio: JSON.stringify(bio),
        profilePic: JSON.stringify(profilePic),
        homeCountry: JSON.stringify(homeCountry),
        nickname: JSON.stringify(nickname),
        website: JSON.stringify(website),
        tdaGradYearBannerVisible: JSON.stringify(tdaGradYearBannerVisible),
      },
    });

    return profile;
  }
}
