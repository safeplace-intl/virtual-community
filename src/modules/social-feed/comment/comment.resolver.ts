import { GraphQLError } from "graphql";
import { type Context } from "src/context.js";
import { AccountResponse } from "src/core/dto/auth.dto.js";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { CreateCommentInput } from "../../../core/dto/social-feed.dto.js";
import { Comment } from "../../../core/entities/comment.entity.js";
import CommentService from "./comment.service.js";

@Service()
@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => Comment, { nullable: true })
  async getCommentById(@Arg("commentId") commentId: number) {
    const comment = await this.commentService.getCommentById(commentId);

    return comment;
  }

  @Mutation(() => Comment)
  async createComment(
    @Arg("createCommentInput") params: CreateCommentInput,
    @Ctx() ctx: Context
  ) {
    const userId = ctx.user?.id;

    if (!userId) {
      throw new GraphQLError("User not found");
    } else {
      const comment = await this.commentService.createComment(params, userId);

      return comment;
    }
  }

  @Mutation(() => Comment)
  async deleteComment(
    @Arg("deleteComment") commentId: number,
    @Ctx() ctx: Context
  ): Promise<AccountResponse> {
    const userId = ctx.user?.id;

    if (!userId) {
      throw new GraphQLError("User not found");
    } else {
      const deletedComment = await this.commentService.deleteComment(
        commentId,
        userId
      );

      return deletedComment;
    }
  }

  @Mutation(() => Comment)
  async likeComment(
    @Arg("CommentId") commentId: number,
    @Ctx() ctx: Context
  ): Promise<Comment> {
    const userId = ctx.user?.id;

    if (!userId) {
      throw new GraphQLError("User not found");
    }

    const likedComment = await this.commentService.likeComment(
      commentId,
      userId
    );

    return likedComment;
  }

  @Mutation(() => Comment)
  async dislikeComment(
    @Arg("CommentId") commentId: number,
    @Ctx() ctx: Context
  ): Promise<Comment> {
    const userId = ctx.user?.id;

    if (!userId) {
      throw new GraphQLError("User not found");
    }

    const dislikedComment = await this.commentService.dislikeComment(
      commentId,
      userId
    );

    return dislikedComment;
  }
}
