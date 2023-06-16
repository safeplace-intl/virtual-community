import { User } from "@prisma/client";
import { Service } from "typedi";

import { AccountResponse } from "../../core/dto/auth.dto.js";
import { CreateUserInput } from "../../core/dto/user.dto.js";
import { DatabaseService } from "../../database/database.service.js";
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
  private readonly databaseService: DatabaseService;

  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
    prismaDbService: DatabaseService
  ) {
    this.databaseService = prismaDbService.getInstance();
  }

  async getUserById(userId: number): Promise<User> {
    try {
      const user = await this.databaseService.users.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async createUser(userInput: CreateUserInput): Promise<User> {
    const email = userInput.email;

    try {
      // checks to make sure email is not already in use
      const existingUser = await this.databaseService.users.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error("Email already in use.");
      } else {
        const password = await this.authService.createPassword(
          userInput.password
        );

        // returns the newly created user object to the resolver
        const user = await this.databaseService.users.create({
          data: {
            email: userInput.email,
            passwordHash: password,
            isActive: true,
          },
        });

        // creates a profile for the new user with or without the pronouns field
        if (userInput.pronouns === undefined || userInput.pronouns === null) {
          await this.profileService.createProfile(user.id, userInput.fullName);
        } else {
          await this.profileService.createProfile(
            user.id,
            userInput.fullName,
            userInput.pronouns
          );
        }

        return user;
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deactivateAccount(email: string): Promise<AccountResponse> {
    try {
      const user = await this.databaseService.users.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      if (!user.isActive) {
        throw new Error("User is already inactive");
      }

      await this.databaseService.users.update({
        where: { email },
        data: { isActive: false },
      });

      // Set a timer to delete the account after 30 days
      setTimeout(async () => {
        await this.databaseService.users.delete({ where: { email } });
      }, 30 * 24 * 60 * 60 * 1000);

      const deactivateAccountResponse: AccountResponse = {
        statusCode: 200,
        message:
          "Your account has been deactivated and will be deleted in 30 days",
      };

      return deactivateAccountResponse;
    } catch (error) {
      return {
        statusCode: 500,
        message: (error as Error).message,
      };
    }
  }

  async deleteAccount(id: number): Promise<AccountResponse> {
    try {
      await this.databaseService.users.delete({
        where: {
          id,
        },
      });

      return {
        statusCode: 200,
        message: "Your account has been permanently deleted",
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
