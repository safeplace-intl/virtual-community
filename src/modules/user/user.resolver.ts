import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { AuthPayload } from "../../core/dto/auth.dto.js";
import { CreateUserInput, GetUserArgs } from "../../core/dto/user.dto.js";
import { User } from "../../core/entities/user.entity.js";
import { AuthService } from "../auth/auth.service.js";
import UserService from "./user.service.js";

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
}
