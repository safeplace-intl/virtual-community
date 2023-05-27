import { Profile } from "@prisma/client";
import { Service } from "typedi";

import ProfileImageService from "../../aws/profile-image.service.js";
import {
  CreateProfileInput,
  UpdateProfileInput,
} from "../../core/dto/profile.dto.js";
import { prisma } from "../../prisma/index.js";

@Service()
export default class ProfileService {
  constructor(private readonly imageService: ProfileImageService) {}

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
          tdaGradYearBannerVisible: false,
        },
      });
    }
  }

  async updateProfile(
    userId: number,
    profileUpdateInput: UpdateProfileInput
  ): Promise<Profile> {
    // ! in here, if profilePic is a field being updated, DO SOME WORK, then we need to call the image service to either create a new profile image, update the image in S3, or delete
    console.log(profileUpdateInput);
    if (
      "profilePic" in profileUpdateInput &&
      profileUpdateInput["profilePic"] == null
    ) {
      console.log("field is here and null");
    } else {
      console.log("field is not here or not null");
    }

    const profile = await prisma.profile.update({
      where: { userId },
      data: profileUpdateInput,
    });

    return profile;
  }
}
