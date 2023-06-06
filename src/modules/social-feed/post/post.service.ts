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
  // TODO: type of error needs a further review
  catch(error: unknown) {
    throw new Error((error as Error).message);
  }

  async getPostById(postId: number): Promise<Post> {
    try {
      const post = await prisma.post.findUnique({
        where: { id: postId },
      });

      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
