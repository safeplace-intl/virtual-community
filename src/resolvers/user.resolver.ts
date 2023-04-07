import UserService from "src/services/user.service.js";
import { User } from "../core/entities/user.entity.js";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  private usersCollection: User[] = [];
  // private userService: UserService;

  @Query(() => [User])
  async users() {
    return this.usersCollection;
  }
}
