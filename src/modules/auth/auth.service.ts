import * as jwt from "jsonwebtoken";
import { AuthTokenPayload, AuthPayload } from "src/core/dto/auth.dto";
import { Service } from "typedi";

@Service()
export class AuthService {
  async createTokens(userId: number): Promise<AuthPayload> {
    // const accessToken = await this.getAccessToken(userId);
    const accessToken = "987654321";
    const refreshToken = "123456789";
    return { accessToken, refreshToken };
  }

  // async getAccessToken(userId: number): Promise<string> {
  // if (!refreshToken) {
  //   throw new Error("No refresh token provided.");
  // } else {
  // return jwt.sign(
  //   {
  //     userId: userId,
  //   },
  //   String(process.env.JWT_SECRET),
  //   {
  //     expiresIn: "1h",
  //   }
  // );
  // }
  // }

  async decodeAuthHeader(authHeader: string): Promise<AuthTokenPayload> {
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      throw new Error("No token provided.");
    }

    return jwt.verify(
      token,
      String(process.env.JWT_SECRET)
    ) as AuthTokenPayload;
  }
}
