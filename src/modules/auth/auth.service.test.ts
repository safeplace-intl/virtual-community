import { User } from "@prisma/client";
import { beforeEach, describe, expect, test } from "vitest";

import { DatabaseService } from "../../database/database.service";
import mockPrisma from "../../database/prisma.mock";
import { AuthService } from "./auth.service.js";

const mockDbService = new DatabaseService(mockPrisma);

const testAuthService = new AuthService(mockDbService);

const testUserPassword = "Password123!!!";
const testUserNewPassword = "NewPassword123!!!";

const testUser: User = {
  id: 1,
  email: "testuser1@test.com",
  passwordHash: "$2b$10$yM9Ya9X9n1.Ov4/NxlbJJOv3eE69WPZJ88KHk/a7Ll6EU.t5mHTC.",
  isActive: true,
};

describe("AuthService", () => {
  beforeEach(() => {
    mockPrisma.user.create({
      data: testUser,
    });
  });

  test("createTokens", async () => {
    const tokens = await testAuthService.createTokens(testUser.id);

    expect(tokens).toBeDefined();
    expect(tokens.accessToken).toBeDefined();
    expect(tokens.accessToken).toHaveLength(143);
    expect(tokens.refreshToken).toBeDefined();
  });

  test("getNewTokens", async () => {
    const tokens = await testAuthService.createTokens(testUser.id);

    const newTokens = await testAuthService.getNewTokens({
      refreshToken: tokens.refreshToken,
      userId: testUser.id,
    });

    expect(newTokens).toBeDefined();
    expect(newTokens.accessToken).toBeDefined();
    expect(tokens.accessToken).toHaveLength(143);
    expect(newTokens.refreshToken).toBeDefined();
  });

  test("createPassword", async () => {
    const passwordHash = await testAuthService.createPassword(testUserPassword);

    expect(passwordHash).toBeDefined();
    expect(passwordHash).toHaveLength(60);
  });

  test("validatePassword", async () => {
    const valid = await testAuthService.validatePassword(
      testUserPassword,
      testUser.passwordHash
    );

    expect(valid).toBeTruthy();
  });

  test("resetPassword", async () => {
    const user = await testAuthService.resetPassword({
      email: testUser.email,
      newPassword: testUserNewPassword,
    });

    expect(user.passwordHash).toBeDefined();
    expect(user.passwordHash).not.toBe(testUser.passwordHash);
  });

  test("changePassword", async () => {
    const user = await testAuthService.changePassword({
      email: testUser.email,
      oldPassword: testUserPassword,
      newPassword: testUserNewPassword,
    });

    expect(user).toBeDefined();
    // expect(user.password).not.toBe(password);
  });
});
