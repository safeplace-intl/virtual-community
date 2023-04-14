import * as bcrypt from "bcrypt";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";

import {
  AuthPayload,
  LoginInput,
  RefreshTokenInput,
  TokenPayload,
} from "../../core/dto/auth.dto.js";
import { prisma } from "../../prisma/index.js";
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
      throw new Error("No such user found");
    }

    // check password
    const valid = await bcrypt.compare(password, user.passwordHash);

    if (!valid) {
      throw new Error("Invalid password");
    }

    // return user and tokens
    const tokens = await this.authService.createTokens(user.id);

    const payload: AuthPayload = {
      user,
      tokens,
    };

    return payload;
  }

  @Mutation(() => TokenPayload)
  async refreshToken(
    @Arg("refreshTokenInput") refreshTokenInput: RefreshTokenInput
  ) {
    return this.authService.getNewTokens(refreshTokenInput);
  }
}
