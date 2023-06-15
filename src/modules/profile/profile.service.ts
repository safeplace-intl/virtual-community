import { Prisma, Profile } from "@prisma/client";
import { Service } from "typedi";

import {
  CreateProfileInput,
  UpdateProfileInput,
} from "../../core/dto/profile.dto.js";
import { PrivacyOption } from "../../core/entities/profile.entity.js";
import { prisma } from "../../prisma/index.js";
import ProfileImageService from "./profile-image.service.js";

export interface IProfileService {
  getProfileByUserId(userId: number): Promise<Profile>;
  createProfile(
    userId: number,
    profileInput: CreateProfileInput
  ): Promise<Profile>;
  updateProfile(
    userId: number,
    profileUpdate: UpdateProfileInput
  ): Promise<Profile>;
  transferProfileImageFileName(userId: number, filename: string): Promise<void>;
  restoreDefaultProfileImage(userId: number): Promise<void>;
}

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
    fullName: string,
    pronouns?: string
  ): Promise<Profile> {
    const requiredCreateProfileFields = {
      fullName: {
        value: fullName,
        visibleTo: PrivacyOption.Friends,
      },
      tdaGradYearBannerVisible: {
        value: false,
        visibleTo: PrivacyOption.Friends,
      },
    };

    const optionalCreateProfileFields = {
      pronouns: {
        value: pronouns,
        visibleTo: PrivacyOption.Friends,
      },
    };

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const defaultProfileImageFileName = (
      await this.imageService.getDefaultProfileImage()
    ).message;

    if (!user) {
      throw new Error("User not found");
    } else {
      const profile = await prisma.profile.create({
        data: {
          userId: userId,
          fullName:
            requiredCreateProfileFields.fullName as unknown as Prisma.JsonObject,
          pronouns:
            (optionalCreateProfileFields.pronouns as unknown as Prisma.JsonObject) ||
            undefined,
          // profilePic is where we store the randomized filename string for the profile image
          // in the profile resolver, we have a field resolver for profileImage that will get the image from S3
          profilePic: {
            value: defaultProfileImageFileName,
            visibleTo: PrivacyOption.Friends,
          } as unknown as Prisma.JsonObject,
          tdaGradYearBannerVisible:
            requiredCreateProfileFields.tdaGradYearBannerVisible as unknown as Prisma.JsonObject,
        },
      });

      return profile;
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
      homeCountry,
      nickname,
      namePronunciation,
      website,
      tdaGradYearBannerVisible,
    } = profileUpdateInput;

    const existingProfile = await this.getProfileByUserId(userId);

    const profile = await prisma.profile.update({
      where: { userId: existingProfile.userId },
      data: {
        fullName: fullName as unknown as Prisma.JsonObject,
        pronouns: pronouns as unknown as Prisma.JsonObject,
        tdaGradYear: tdaGradYear as unknown as Prisma.JsonObject,
        currentLocation: currentLocation as unknown as Prisma.JsonObject,
        bio: bio as unknown as Prisma.JsonObject,
        tdaGradYearBannerVisible:
          tdaGradYearBannerVisible as unknown as Prisma.JsonObject,
        homeCountry: homeCountry as unknown as Prisma.JsonObject,
        nickname: nickname as unknown as Prisma.JsonObject,
        namePronunciation: namePronunciation as unknown as Prisma.JsonObject,
        website: website as unknown as Prisma.JsonObject,
      },
    });

    return profile;
  }

  // this function is called from the profile resolver, when it creates a new key and signed url for an upload
  // the hole in this, is that if the client gets a new key and signed url, but does not complete the upload, we may have incorrect data. We did not have time to implement a solution for this.
  async transferProfileImageFileName(userId: number, filename: string) {
    const existingProfile = await this.getProfileByUserId(userId);
    const profilePrivacy = existingProfile?.profilePic;
    const { visibleTo } = profilePrivacy as Prisma.JsonObject;

    await prisma.profile.update({
      where: { userId: existingProfile.userId },
      data: {
        profilePic: {
          value: filename,
          visibleTo,
        } as unknown as Prisma.JsonObject,
      },
    });
  }

  async restoreDefaultProfileImage(userId: number) {
    const existingProfile = await this.getProfileByUserId(userId);
    const profilePrivacy = existingProfile?.profilePic;
    const { visibleTo } = profilePrivacy as Prisma.JsonObject;

    const defaultProfileImageFileName = (
      await this.imageService.getDefaultProfileImage()
    ).message;

    await prisma.profile.update({
      where: { userId: existingProfile.userId },
      data: {
        profilePic: {
          value: defaultProfileImageFileName,
          visibleTo,
        } as unknown as Prisma.JsonObject,
      },
    });
  }
}
