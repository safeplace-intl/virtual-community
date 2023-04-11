import UserService from "./user.service.js";
import { User } from "../../core/entities/user.entity.js";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserInput, GetUserArgs } from "../../core/dto/user.dto.js";
import { Service } from "typedi";
import { AuthService } from "../auth/auth.service.js";

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

  @Mutation(() => User)
  async createUser(
    @Arg("createUserInput") params: CreateUserInput
  ): Promise<User> {
    console.log("in user resolver createUser");
    const userInfo = await this.userService.createUser(params);

    const tokens = await this.authService.createTokens(userInfo.id);

    const user: User = { ...userInfo, authPayload: tokens };

    return user;
  }
}
