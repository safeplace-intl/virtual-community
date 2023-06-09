import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";

import {
  AuthPayload,
  ChangePasswordInput,
  ResetPasswordInput,
} from "../../core/dto/auth.dto.js";
import { AccountResponse } from "../../core/dto/auth.dto.js";
import { CreateUserInput } from "../../core/dto/user.dto.js";
import { Profile } from "../../core/entities/profile.entity.js";
import { User } from "../../core/entities/user.entity.js";
import { AuthService } from "../auth/auth.service.js";
import ProfileService from "../profile/profile.service.js";
import UserService from "./user.service.js";

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly profileService: ProfileService
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
  async resetPassword(
    @Arg("resetPasswordInput") input: ResetPasswordInput
  ): Promise<User> {
    const updatedUser = await this.authService.resetPassword(input);

    return updatedUser;
  }

  @Mutation(() => User)
  async changePassword(
    @Arg("changePasswordInput") input: ChangePasswordInput
  ): Promise<User> {
    const updatedUser = await this.authService.changePassword(input);
    return updatedUser;
  }

  @Mutation(() => AccountResponse)
  async deactivateAccount(
    @Arg("email") email: string
  ): Promise<AccountResponse> {
    const deactivateAccountResponse = await this.userService.deactivateAccount(
      email
    );

    return deactivateAccountResponse;
  }

  @Mutation(() => AccountResponse)
  async deleteAccount(@Arg("id") id: number) {
    const deleteAccountResponse = await this.userService.deleteAccount(id);
    return deleteAccountResponse;
  }

  @FieldResolver(() => Profile)
  async profile(@Root() user: User) {
    const profile = await this.profileService.getProfileByUserId(user.id);

    return profile;
  }
}
