import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Service } from "typedi";

import { RefreshTokenInput, TokensPayload } from "../../core/dto/auth.dto.js";
import {
  ChangePasswordInput,
  ResetPasswordInput,
} from "../../core/dto/auth.dto.js";
import {
  DatabaseService,
  // prismaDbService,
} from "../../database/database.service.js";

export interface IAuthService {
  createTokens(userId: number): Promise<TokensPayload>;
  getNewTokens({
    refreshToken,
    userId,
  }: RefreshTokenInput): Promise<TokensPayload>;
  createPassword(password: string): Promise<string>;
  validatePassword(password: string, passwordHash: string): Promise<boolean>;
  resetPassword(resetPasswordInput: ResetPasswordInput): Promise<User>;
  changePassword(changePasswordInput: ChangePasswordInput): Promise<User>;
}

@Service()
export class AuthService implements IAuthService {
  private readonly databaseService: DatabaseService;

  constructor(prismaDbService: DatabaseService) {
    this.databaseService = prismaDbService.getInstance();
  }

  async createTokens(userId: number): Promise<TokensPayload> {
    try {
      const accessToken = jwt.sign(
        { userId: userId },
        String(process.env.JWT_SECRET),
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign(
        { userId: userId },
        String(process.env.JWT_SECRET),
        { expiresIn: "1h" }
      );

      const payload: TokensPayload = { accessToken, refreshToken };

      return payload;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getNewTokens({
    refreshToken,
    userId,
  }: RefreshTokenInput): Promise<TokensPayload> {
    try {
      const valid = jwt.verify(refreshToken, String(process.env.JWT_SECRET));

      let newTokens: TokensPayload;

      if (valid) {
        newTokens = await this.createTokens(userId);
      } else {
        throw new Error("Invalid refresh token");
      }

      return newTokens;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async createPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      return hashedPassword;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async validatePassword(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    try {
      const valid = await bcrypt.compare(password, passwordHash);

      return valid;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async resetPassword(resetPasswordInput: ResetPasswordInput): Promise<User> {
    try {
      const { email, newPassword } = resetPasswordInput;

      // Check if user exists
      const user = await this.databaseService.users.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Generate new password hash
      const passwordHash = await this.createPassword(newPassword);

      // Update user's password hash
      const updatedUser = await this.databaseService.users.update({
        where: { email },
        data: { passwordHash },
      });

      return updatedUser;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async changePassword(
    changePasswordInput: ChangePasswordInput
  ): Promise<User> {
    try {
      const { email, newPassword, oldPassword } = changePasswordInput;

      const user = await this.databaseService.users.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordMatching = await this.validatePassword(
        oldPassword,
        user.passwordHash
      );

      if (!isPasswordMatching) {
        throw new Error("Incorrect old password");
      }

      const newPasswordHash = await this.createPassword(newPassword);

      const updatedUser = await this.databaseService.users.update({
        where: { email },
        data: { passwordHash: newPasswordHash },
      });

      return updatedUser;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
