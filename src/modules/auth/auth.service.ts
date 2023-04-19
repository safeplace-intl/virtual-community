import jwt from "jsonwebtoken";
import { Service } from "typedi";

import { RefreshTokenInput, TokensPayload } from "../../core/dto/auth.dto.js";

@Service()
export class AuthService {
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

  async getNewTokens({ refreshToken, userId }: RefreshTokenInput) {
    const valid = jwt.verify(refreshToken, String(process.env.JWT_SECRET));

    let newTokens: TokensPayload;

    if (valid) {
      newTokens = await this.createTokens(userId);
    } else {
      throw new Error("Invalid refresh token");
    }

    return newTokens;
  }
}
