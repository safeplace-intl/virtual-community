import jwt from "jsonwebtoken";
import { Service } from "typedi";

import { TokenPayload } from "../../core/dto/auth.dto.js";

@Service()
export class AuthService {
  // constructor() {}

  async createTokens(userId: number): Promise<TokenPayload> {
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
    const payload: TokenPayload = { accessToken, refreshToken };
    return payload;
  }
}
