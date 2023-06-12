import { GraphQLError } from "graphql";
import { type Context } from "src/context.js";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
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

  //Potentially will be handled inside of the post resolver?
  @Query(() => [Comment], { nullable: true })
  async getCommentsByPostId(@Arg("postId") postId: number) {
    const comments = await this.commentService.getCommentsByPostId(postId);
    return comments;
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
}
