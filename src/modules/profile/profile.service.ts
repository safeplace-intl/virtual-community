import { Profile } from "@prisma/client";
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
    // ! are we storing a url reference in the DB or do we need to call getImage everytime the user profile is resolved?
    console.log(profileUpdateInput);
    if (
      // Delete is the only time that the image service needs to be called
      "profilePic" in profileUpdateInput &&
      profileUpdateInput["profilePic"] == null
    ) {
      const response = this.imageService.deleteImageByUserId(userId);
      console.log(response);
    }

    const profile = await prisma.profile.update({
      where: { userId },
      data: profileUpdateInput,
    });

    return profile;
  }

  async getS3Url(userId: number) {
    return await this.imageService.generateSignedUrlByUserId(userId);
  }
}
