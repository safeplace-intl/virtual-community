import { Arg, Float, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import {
  CreatePostInput,
  PostDeletedResponse,
  UpdatePostInput,
} from "../../../core/dto/social-feed.dto.js";
import { Post } from "../../../core/entities/post.entity.js";
import PostService from "./post.service.js";

@Service()
@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => Post, { nullable: true })
  async getPostById(@Arg("postId") postId: number) {
    const post = await this.postService.getPostById(postId);
    return post;
  }
  @Query(() => Post, { nullable: true })
  async getPostByUserId(@Arg("userId") userId: number) {
    const posts = await this.postService.getPostByUserId(userId);
    return posts;
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("userId", () => Float) userId: number,
    @Arg("createPostInput") createPostInput: CreatePostInput
  ) {
    const post = await this.postService.createPost(createPostInput, userId);
    return post;
  }

  @Mutation(() => Post)
  async updatePost(
    // @Arg("userId", () => Float) userId: number,
    @Arg("postId", () => Float) postId: number,
    @Arg("updatePostInput") updatePostInput: UpdatePostInput
  ) {
    const updatedPost = await this.postService.updatePost(
      updatePostInput,
      // userId,
      postId
    );
    return updatedPost;
  }

  @Mutation(() => PostDeletedResponse)
  async deletePost(@Arg("id") id: number) {
    const deletePostResponse = await this.postService.deletePost(id);
    return deletePostResponse;
  }
}
