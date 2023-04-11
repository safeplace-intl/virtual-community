import { Service } from "typedi";
import { prisma } from "../../prisma/index.js";
import { CreateUserInput } from "../../core/dto/user.dto";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Service()
export default class UserService {
  async getUserById(userId: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async createUser(userInput: CreateUserInput): Promise<User> {
    console.log("in user service createUser");
    const email = userInput.email;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists.");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userInput.password, salt);

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
