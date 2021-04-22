import { Post } from "../../entities/Post";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class PaginatedPost {
  @Field(() => [Post])
  posts: Post[];

  @Field(() => Boolean)
  hasMore: Boolean;
}