import { GraphQLError } from "graphql";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Ctx } from "type-graphql";
import { Service } from "typedi";

import { type Context } from "../../../context.js";
import {
  CreatePostInput,
  PostDeletedResponse,
  UpdatePostInput,
} from "../../../core/dto/social-feed.dto.js";
import { Comment } from "../../../core/entities/comment.entity.js";
import { Post } from "../../../core/entities/post.entity.js";
import CommentService from "../comment/comment.service.js";
import PostService from "./post.service.js";

@Service()
@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService
  ) {}

  @Query(() => Post, { nullable: true })
  async getPostById(@Arg("postId") postId: number) {
    const post = await this.postService.getPostById(postId);

    return post;
  }

  @Query(() => [Post])
  async getPostsByUserId(@Ctx() context: Context) {
    if (context.user?.id) {
      const posts = await this.postService.getPostsByUserId(context.user?.id);

      return posts;
    } else {
      throw new GraphQLError("no user id");
    }
  }

  @Mutation(() => Post)
  async createPost(
    @Ctx() context: Context,
    @Arg("createPostInput") createPostInput: CreatePostInput
  ) {
    if (context.user?.id) {
      const post = await this.postService.createPost(
        createPostInput,
        context.user?.id
      );

      return post;
    } else {
      throw new GraphQLError("no user id");
    }
  }

  @Mutation(() => Post)
  async updatePost(@Arg("updatePostInput") updatePostInput: UpdatePostInput) {
    const updatedPost = await this.postService.updatePost(updatePostInput);

    return updatedPost;
  }

  @Mutation(() => PostDeletedResponse)
  async deletePost(@Arg("id") id: number) {
    const deletePostResponse = await this.postService.deletePost(id);

    return deletePostResponse;
  }

  @FieldResolver(() => [Comment])
  async comments(@Root() post: Post) {
    const comments = await this.commentService.getCommentsByPostId(post.id);

    return comments;
  }
}
