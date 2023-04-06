import { User } from "../core/entities/user.entity.js";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  private usersCollection: User[] = [];

  @Query(() => [User])
  async users() {
    return this.usersCollection;
  }
}
