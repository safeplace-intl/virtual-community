import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { AuthPayload } from "../../core/dto/auth.dto.js";
import {
  ChangePasswordInput,
  CreateUserInput,
  GetUserArgs,
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
  async getUser(@Args() params: GetUserArgs) {
    const user = await this.userService.getUserById(params.userId);
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
  async resetPassword(
    @Arg("resetPasswordInput") input: ResetPasswordInput
  ): Promise<User> {
    const updatedUser = await this.authService.resetPassword(input);

    return updatedUser;
  }

  @Mutation(() => String)
  async deactivateAccount(@Arg("email") email: string): Promise<string> {
    const message = await this.userService.deactivateAccount(email);

    return message;
  }

  @Mutation(() => Boolean)
  async deleteAccount(@Arg("id") id: number) {
    const status = await this.userService.deleteAccount(id);
    return status;
  }

  @Mutation(() => User)
  async changePassword(
    @Arg("changePasswordInput") input: ChangePasswordInput
  ): Promise<User> {
    const updatedUser = await this.authService.changePassword(input);
    return updatedUser;
  }
}
