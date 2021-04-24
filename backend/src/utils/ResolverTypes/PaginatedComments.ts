import { PostComment } from "../../entities/PostComment";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedComments {
	@Field(() => [PostComment])
	comments: PostComment[];

	@Field(() => Boolean)
	hasMore: Boolean;
}
