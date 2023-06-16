import { GraphQLError } from "graphql";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";

import {
  AuthPayload,
  LoginInput,
  RefreshTokenInput,
  TokensPayload,
} from "../../core/dto/auth.dto.js";
import { prisma } from "../../database/index.js";
import { AuthService } from "./auth.service.js";

@Service()
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async login(@Arg("loginInput") loginInput: LoginInput) {
    // validate user exists
    const { email, password } = loginInput;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new GraphQLError("Invalid login credentials");
    }

    // check password
    const valid = await this.authService.validatePassword(
      password,
      user.passwordHash
    );

    if (!valid) {
      throw new GraphQLError("Invalid login credentials");
    }

    // calls auth service to create tokens
    const tokens = await this.authService.createTokens(user.id);

    const payload: AuthPayload = {
      user,
      tokens,
    };

    return payload;
  }

  @Mutation(() => TokensPayload)
  async refreshToken(
    @Arg("refreshTokenInput") refreshTokenInput: RefreshTokenInput
  ) {
    return this.authService.getNewTokens(refreshTokenInput);
  }
}
