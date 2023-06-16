import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Comment {
  @Field()
  id!: number;

  @Field()
  userId!: number;

  @Field()
  postId!: number;

  @Field()
  content!: string;

  @Field(() => Int, { defaultValue: 0 })
  likes!: number;

  @Field(() => Int, { defaultValue: 0 })
  dislikes!: number;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;

  @Field(() => [Int], { defaultValue: [] })
  likedBy!: number[];

  @Field(() => [Int], { defaultValue: [] })
  dislikedBy!: number[];
}
