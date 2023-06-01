import { User } from "@prisma/client";
import { Service } from "typedi";

import { AccountResponse } from "../../core/dto/auth.dto.js";
import { CreateUserInput } from "../../core/dto/user.dto.js";
import { PrivacyOption } from "../../core/entities/profile.entity.js";
import { prisma } from "../../prisma/index.js";
import { AuthService } from "../auth/auth.service.js";
import ProfileService from "../profile/profile.service.js";

interface IUserService {
  getUserById(userId: number): Promise<User>;
  createUser(userInput: CreateUserInput): Promise<User>;
  deactivateAccount(email: string): Promise<AccountResponse>;
  deleteAccount(id: number): Promise<AccountResponse>;
}

@Service()
export default class UserService implements IUserService {
  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService
  ) {}

  async getUserById(userId: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async createUser(userInput: CreateUserInput): Promise<User> {
    const email = userInput.email;

    // checks to make sure email is not already in use
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email already in use.");
    } else {
      const password = await this.authService.createPassword(
        userInput.password
      );

      // returns the newly created user object to the resolver
      const user = await prisma.user.create({
        data: {
          email: userInput.email,
          passwordHash: password,
          isActive: true,
        },
      });

      const requiredCreateProfileFields = {
        fullName: {
          value: userInput.fullName,
          visibleTo: PrivacyOption.Friends,
        },
        tdaGradYearBannerVisible: {
          value: false,
          visibleTo: PrivacyOption.Friends,
        },
      };

      // creates a profile for the new user with or without the pronouns field
      if (userInput.pronouns === undefined || userInput.pronouns === null) {
        await this.profileService.createProfile(user.id, {
          ...requiredCreateProfileFields,
        });
      } else {
        await this.profileService.createProfile(user.id, {
          ...requiredCreateProfileFields,
          pronouns: {
            value: userInput.pronouns,
            visibleTo: PrivacyOption.Friends,
          },
        });
      }
      return user;
    }
  }

  async deactivateAccount(email: string): Promise<AccountResponse> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.isActive) {
      throw new Error("User is already inactive");
    }

    await prisma.user.update({
      where: { email },
      data: { isActive: false },
    });

    // Set a timer to delete the account after 30 days
    setTimeout(async () => {
      await prisma.user.delete({ where: { email } });
    }, 30 * 24 * 60 * 60 * 1000);

    const deactivateAccountResponse: AccountResponse = {
      statusCode: 200,
      message:
        "Your account has been deactivated and will be deleted in 30 days",
    };

    return deactivateAccountResponse;
  }

  async deleteAccount(id: number): Promise<AccountResponse> {
    try {
      await prisma.user.delete({
        where: {
          id,
        },
      });

      return {
        statusCode: 200,
        message: "Your account has been permanently deleted",
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: (error as Error).message,
      };
    }
  }
}
