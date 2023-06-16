import { Post } from "@prisma/client";
import { Service } from "typedi";

import {
  CreatePostInput,
  PostDeletedResponse,
  UpdatePostInput,
} from "../../../core/dto/social-feed.dto.js";
import { DatabaseService } from "../../../database/database.service.js";

interface IPostService {
  getPostsByUserId(userId: number): Promise<Post[]>;
  getPostById(postId: number): Promise<Post>;
  createPost(userInput: CreatePostInput, userId: number): Promise<Post>;
  updatePost(userInput: UpdatePostInput, id: number): Promise<Post>;
  deletePost(id: number): Promise<PostDeletedResponse>;
}

@Service()
export default class PostService implements IPostService {
  private readonly databaseService: DatabaseService;

  constructor(prismaDbService: DatabaseService) {
    this.databaseService = prismaDbService.getInstance();
  }

  async getPostsByUserId(userId: number): Promise<Post[]> {
    try {
      const posts = await this.databaseService.posts.find({
        where: { userId },
      });

      return posts;
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    }
  }

  async getPostById(postId: number): Promise<Post> {
    try {
      const post = await this.databaseService.posts.findUnique({
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

  async createPost(
    createPostInput: CreatePostInput,
    userId: number
  ): Promise<Post> {
    try {
      const post = await this.databaseService.posts.create({
        data: { ...createPostInput, userId },
      });

      return post;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async updatePost(updatePostInput: UpdatePostInput): Promise<Post> {
    try {
      const post = await this.databaseService.posts.findUnique({
        where: { id: updatePostInput.postId },
      });

      if (!post) {
        throw new Error("Post not found");
      }

      const updatedPost = await this.databaseService.posts.update({
        where: { id: updatePostInput.postId },
        data: { ...updatePostInput, userId: post.userId },
      });

      return updatedPost;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deletePost(id: number): Promise<PostDeletedResponse> {
    try {
      await this.databaseService.posts.delete({
        where: { id },
      });

      return {
        statusCode: 200,
        message: "Your post has been permanently deleted",
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
