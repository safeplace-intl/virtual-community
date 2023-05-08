import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { Service } from "typedi";

import { CreateUserInput } from "../../core/dto/user.dto.js";
import { prisma } from "../../prisma/index.js";
import { AuthService } from "../auth/auth.service.js";

@Service()
export default class UserService {
  constructor(private readonly authService: AuthService) {}

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
      const password = await this.authService.createPassword(userInput);
      // returns the newly created user object to the resolver
      const user = await prisma.user.create({
        data: {
          email: userInput.email,
          passwordHash: password,
          isActive: true,
        },
      });
      return user;
    }
  }

  async deactivateAccount(email: string): Promise<string> {
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

    return "Your account has been deactivated and will be deleted in 30 days";
  }

  async deleteAccount(id: number): Promise<boolean> {
    try {
      await prisma.user.delete({
        where: {
          id,
        },
      });
      return true;
    } catch {
      return false;
    }
  }
}
