import { Comment } from "@prisma/client";
import { CreateCommentInput } from "src/core/dto/social-feed.dto.js";
import { Service } from "typedi";

import { prisma } from "../../../prisma/index.js";

@Service()
export default class CommentService {
  async createComment(
    commentInput: CreateCommentInput,
    userId: number
  ): Promise<Comment> {
    try {
      const comment = await prisma.comment.create({
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
  async deleteComment(commentId: number, userId: number): Promise<boolean> {
    try {
      const comment = await prisma.comment.findUnique({
        where: { id: commentId },
      });
      if (comment.userId !== userId) {
        throw new Error("userId provided does not match the comments userId");
      } else {
        const deletedComment = await prisma.comment.delete({
          where: { id: commentId },
        });
        if (!deletedComment) {
          throw new Error("failed to deete comment");
        }

        return true;
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    try {
      const comments = await prisma.comment.findMany({
        where: { postId },
      });
      if (comments.length === 0) {
        throw new Error("Comments not found");
      } else {
        return comments;
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getCommentById(commentId: number): Promise<Comment> {
    try {
      const comment = await prisma.comment.findUnique({
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
}
