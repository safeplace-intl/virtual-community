import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { Service } from "typedi";

import { CreateUserInput } from "../../core/dto/user.dto.js";
import { prisma } from "../../prisma/index.js";
import { AuthService } from "../auth/auth.service.js";

@Service()
export default class UserService {
  constructor(private readonly authService: AuthService) {}

  async getUserById(userId: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async createUser(userInput: CreateUserInput): Promise<User> {
    const email = userInput.email;

    // checks to make sure email is not already in use
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists.");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userInput.password, salt);

      // returns the newly created user object to the resolver
      return await prisma.user.create({
        data: {
          email: userInput.email,
          fullName: userInput.fullName,
          pronouns: userInput.pronouns,
          passwordHash: hashedPassword,
        },
      });
    }
  }
}
