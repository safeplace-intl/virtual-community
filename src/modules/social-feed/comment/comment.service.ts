import { Comment } from "@prisma/client";
import { Service } from "typedi";

import { AccountResponse } from "../../../core/dto/auth.dto.js";
import { CreateCommentInput } from "../../../core/dto/social-feed.dto.js";
import { DatabaseService } from "../../../database/database.service.js";

interface ICommentService {
  getCommentsByPostId(userId: number): Promise<Comment[]>;
  getCommentById(postId: number): Promise<Comment>;
  createComment(
    userInput: CreateCommentInput,
    userId: number
  ): Promise<Comment>;
  deleteComment(commentId: number, userId: number): Promise<AccountResponse>;
}

@Service()
export default class CommentService implements ICommentService {
  private readonly databaseService: DatabaseService;

  constructor(prismaDbService: DatabaseService) {
    this.databaseService = prismaDbService.getInstance();
  }

  async createComment(
    commentInput: CreateCommentInput,
    userId: number
  ): Promise<Comment> {
    try {
      const comment = await this.databaseService.comments.create({
        data: {
          userId: userId,
          postId: commentInput.postId,
          content: commentInput.content,
        },
      });

      return comment;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deleteComment(
    commentId: number,
    userId: number
  ): Promise<AccountResponse> {
    try {
      const comment = await this.databaseService.comments.findUnique({
        where: { id: commentId },
      });

      if (!comment) {
        throw new Error("Comment not found");
      }

      if (comment.userId !== userId) {
        throw new Error("userId provided does not match the comments userId");
      } else {
        await this.databaseService.comments.delete({
          where: { id: commentId },
        });

        return {
          statusCode: 200,
          message: "Comment deleted",
        };
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    try {
      const comments = await this.databaseService.comments.find({
        where: { postId },
      });

      return comments;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getCommentById(commentId: number): Promise<Comment> {
    try {
      const comment = await this.databaseService.comments.findUnique({
        where: { id: commentId },
      });

      if (!comment) {
        throw new Error("Comment not found");
      }

      return comment;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async likeComment(commentId: number, userId: number): Promise<Comment> {
    const comment = await this.databaseService.comments.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.likedBy.includes(userId)) {
      throw new Error("User has already liked the comment");
    }

    const updatedComment = await this.databaseService.comments.update({
      where: { id: commentId },
      data: {
        likedBy: { push: userId },
        likes: { increment: 1 },
      },
    });

    return updatedComment;
  }

  async dislikeComment(commentId: number, userId: number): Promise<Comment> {
    const comment = await this.databaseService.comments.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.dislikedBy.includes(userId)) {
      throw new Error("User has already disliked the comment");
    }

    const updatedComment = await this.databaseService.comments.update({
      where: { id: commentId },
      data: {
        dislikedBy: { push: userId },
        dislikes: { increment: 1 },
      },
    });

    return updatedComment;
  }
}
