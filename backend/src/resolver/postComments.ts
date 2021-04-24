import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getConnection, getRepository } from "typeorm";
import { Post } from "../entities/Post";
import { PostComment } from "../entities/PostComment";
import { User } from "../entities/User";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { GraphQlCxt } from "../types/GraphQlCtx";
import { PaginatedComments } from "../utils/ResolverTypes/PaginatedComments";

@Resolver(PostComment)
export class PostCommentResolver {

	// fetch creator data
	@FieldResolver(() => User)
	user(@Root() comment: PostComment, @Ctx() {userLoader}:GraphQlCxt) {
		return userLoader.load(comment.userId);
	}

	@Query(() => PaginatedComments)
	async commentsOnPost(
		@Arg("postId", () => Int!) postId: number,
		@Arg("limit", () => Int) limit: number,
		@Arg("skip", () => Int, { defaultValue: 0 }) skip: number
	): Promise<PaginatedComments> {
		const limitplus1 = limit + 1;

		const comments = await getRepository(PostComment)
			.createQueryBuilder("post_comment")
			.where('"postId" = :postId', { postId })
			.orderBy('post_comment."createdAt"', "DESC")
			.skip(skip)
			.take(limitplus1)
			.getMany();
		return {
			comments: comments.slice(0, limit),
			hasMore: comments.length === limitplus1,
		};
	}

	@Mutation(() => PostComment)
	@UseMiddleware(isAuthenticated)
	async addComment(
		@Arg("postId", () => Int) postId: number,
		@Arg("text") text: string,
		@Ctx() { req }: GraphQlCxt
	): Promise<PostComment> {
		const userId = req.session.userId;

		const comment = await getConnection()
			.createQueryBuilder()
			.insert()
			.into(PostComment)
			.values({ postId, userId, text })
			.returning("*")
			.execute();

		await getConnection()
			.createQueryBuilder()
			.update(Post)
			.set({ numComments: () => `"numComments" + 1` })
			.where("id = :id", {
				id: postId,
			})
			.execute();

		return comment.raw[0];
	}

	@Mutation(() => Boolean)
	async deleteComment(
		@Arg("commentId", () => Int) commentId: number,
		@Arg("postId", () => Int) postId : number,
		@Ctx() {req}: GraphQlCxt
	): Promise<boolean> {
		await getConnection().transaction(async (tm) => {
			await tm.query(
				`
					delete from post_comment
					where "id" = $1 and "userId" = $2
				`,
				[commentId, req.session.userId]
			);
			await tm.query(
				`
					update post
					set "numComments" = "numComments" - $1
					where id = $2
				  `,
				[1, postId]
			);
		});
		return true
	}
	
}