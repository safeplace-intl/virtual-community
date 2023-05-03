import { Profile } from "@prisma/client";
import { Service } from "typedi";

import { CreateProfileInput } from "../../core/dto/profile.dto.js";
import { prisma } from "../../prisma/index.js";

@Service()
export default class ProfileService {
  async getProfileByUserId(userId: number): Promise<Profile> {
    const profile = await prisma.profile.findUnique({
      where: { userId: userId },
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

    if (!user) {
      throw new Error("User not found");
    } else {
      return await prisma.profile.create({
        data: {
          userId: userId,
          fullName: profileInput.fullName,
          pronouns: profileInput.pronouns,
          tdaGradYear: profileInput.tdaGradYear,
          currentLocation: profileInput.currentLocation,
          bio: profileInput.bio,
          profilePic: profileInput.profilePic,
          homeCountry: profileInput.homeCountry,
          nickname: profileInput.nickname,
          website: profileInput.website,
          tdaGradYearBannerVisible: profileInput.tdaGradYearBannerVisible,
        },
      });
    }
  }
}
