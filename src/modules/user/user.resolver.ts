import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { AuthPayload } from "../../core/dto/auth.dto.js";
import {
  CreateUserInput,
  ResetPasswordInput,
} from "../../core/dto/user.dto.js";
import { User } from "../../core/entities/user.entity.js";
import { AuthService } from "../auth/auth.service.js";
import UserService from "./user.service.js";

const prisma = new PrismaClient();

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Query(() => User, { nullable: true })
  async getUser(@Arg("userId") userId: number) {
    const user = await this.userService.getUserById(userId);
    return user;
  }

  @Mutation(() => AuthPayload)
  async createUser(
    @Arg("createUserInput") params: CreateUserInput
  ): Promise<AuthPayload> {
    // ask the user service to create a new user with the supplied params
    const user = await this.userService.createUser(params);

    // ask the auth service to make tokens for the new user
    const tokens = await this.authService.createTokens(user.id);

    const payload: AuthPayload = {
      user,
      tokens,
    };
    return payload;
  }

  @Mutation(() => User)
  async resetPassword(@Arg("input") input: ResetPasswordInput): Promise<User> {
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

  @Mutation(() => Boolean)
  async deleteAccount(@Arg("id") id: number) {
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
