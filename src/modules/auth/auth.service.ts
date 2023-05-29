import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Service } from "typedi";

import { RefreshTokenInput, TokensPayload } from "../../core/dto/auth.dto.js";
import {
  ChangePasswordInput,
  ResetPasswordInput,
} from "../../core/dto/auth.dto.js";
import { prisma } from "../../prisma/index.js";

interface IAuthService {
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
  // constructor() {}

  async createTokens(userId: number): Promise<TokensPayload> {
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
  }

  async getNewTokens({
    refreshToken,
    userId,
  }: RefreshTokenInput): Promise<TokensPayload> {
    const valid = jwt.verify(refreshToken, String(process.env.JWT_SECRET));

    let newTokens: TokensPayload;

    if (valid) {
      newTokens = await this.createTokens(userId);
    } else {
      throw new Error("Invalid refresh token");
    }

    return newTokens;
  }

  async createPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async validatePassword(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    const valid = await bcrypt.compare(password, passwordHash);

    return valid;
  }

  async resetPassword(resetPasswordInput: ResetPasswordInput): Promise<User> {
    const { email, newPassword } = resetPasswordInput;

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    // Generate new password hash
    const passwordHash = await this.createPassword(newPassword);

    // Update user's password hash
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { passwordHash },
    });

    return updatedUser;
  }

  async changePassword(
    changePasswordInput: ChangePasswordInput
  ): Promise<User> {
    const { email, newPassword, oldPassword } = changePasswordInput;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatching = await bcrypt.compare(
      oldPassword,
      user.passwordHash
    );

    if (!isPasswordMatching) {
      throw new Error("Incorrect old password");
    }

    const newPasswordHash = await this.createPassword(newPassword);

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { passwordHash: newPasswordHash },
    });
    return updatedUser;
  }
}
