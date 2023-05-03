import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { Service } from "typedi";

import {
  CreateUserInput,
  ResetPasswordInput,
  ChangePasswordInput,
} from "../../core/dto/user.dto.js";
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
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userInput.password, salt);

      // returns the newly created user object to the resolver
      const user = await prisma.user.create({
        data: {
          email: userInput.email,
          passwordHash: hashedPassword,
          isActive: true,
        },
      });
      return user;
    }
  }

  async resetPassword(input: ResetPasswordInput): Promise<User> {
    const { email, newPassword } = input;

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    // Generate new password hash
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    // Update user's password hash
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { passwordHash },
    });

    return updatedUser;
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

  async changePassword(input: ChangePasswordInput): Promise<User> {
    const { email, newPassword, oldPassword } = input;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }
    const salt = await bcrypt.genSalt(10);

    const isPasswordMatching = await bcrypt.compare(
      oldPassword,
      user.passwordHash
    );

    if (!isPasswordMatching) {
      throw new Error("Incorrect old password");
    }

    const newPasswordHash = await bcrypt.hash(newPassword, salt);
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { passwordHash: newPasswordHash },
    });
    return updatedUser;
  }
}
