import { Post } from "@prisma/client";
import { Service } from "typedi";

import { prisma } from "../../../prisma/index.js";

@Service()
export default class PostService {
  async getPostByUserId(userId: number): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: { id: userId },
    });

    if (!posts) {
      throw new Error("Posts not found");
    } else {
      return posts.map((post) => ({
        ...post,
      }));
    }
  }
}
