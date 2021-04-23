import { Post } from "../entities/Post";
import {
	Arg,
	Ctx,
	FieldResolver,
	Int,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from "type-graphql";
import { getConnection, getRepository } from "typeorm";
import { GraphQlCxt } from "../types/GraphQlCtx";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { User } from "../entities/User";
import { UserLoader } from "../utils/UserLoader";
import { isBanned } from "../middleware/isBanned";
import { PaginatedPost } from "../utils/ResolverTypes/PaginatedPostType";

@Resolver(Post)
export class PostResolver {
	// fetch creator data
	@FieldResolver(() => User)
	creator(@Root() post: Post) {
		return UserLoader.load(post.creatorId);
	}

	@Query(() => PaginatedPost, { nullable: true })
	@UseMiddleware(isBanned)
	async postsByUser(
		@Arg("id", () => Int) id: number,
		@Arg("limit", () => Int) limit: number,
		@Arg("skip", () => Int, { defaultValue: 0 }) skip: number
	): Promise<PaginatedPost | undefined> {
		const limitplus1 = limit + 1;

		const posts = await getRepository(Post)
			.createQueryBuilder("post")
			.where('"creatorId" = :creatorId', { creatorId: id })
			.orderBy('post."createdAt"', "DESC")
			.skip(skip)
			.take(limitplus1)
			.getMany();
		console.log(posts.length);
		return {
			posts: posts.slice(0, limit),
			hasMore: posts.length === limitplus1,
		};
	}
	// Get one post
	@Query(() => Post, { nullable: true })
	async post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
		return Post.findOne(id);
	}

	@Query(() => PaginatedPost)
	async posts(
		@Arg("limit", () => Int) limit: number,
		@Arg("skip", () => Int, { defaultValue: 0 }) skip: number
	): Promise<PaginatedPost> {
		const limitplus1 = limit + 1;

		const posts = await getRepository(Post)
			.createQueryBuilder("post")
			.orderBy('post."createdAt"', "DESC")
			.skip(skip)
			.take(limitplus1)
			.getMany();
		console.log(posts.length);
		return {
			posts: posts.slice(0, limit),
			hasMore: posts.length === limitplus1,
		};
	}

	// create post
	@Mutation(() => Post)
	@UseMiddleware(isAuthenticated)
	@UseMiddleware(isBanned)
	async createPost(
		@Arg("text") text: string,
		@Ctx() { req }: GraphQlCxt
	): Promise<Post> {
		return Post.create({ text, creatorId: req.session.userId }).save();
	}

	// update post
	@Mutation(() => Post, { nullable: true })
	@UseMiddleware(isAuthenticated)
	@UseMiddleware(isBanned)
	async updatePost(
		@Arg("id", () => Int) id: number,
		@Arg("text") text: string,
		@Ctx() { req }: GraphQlCxt
	): Promise<Post> {
		const post = await getConnection()
			.createQueryBuilder()
			.update(Post)
			.set({ text })
			.where('id = :id and "creatorId" = :creatorId', {
				id,
				creatorId: req.session.userId,
			})
			.returning("*")
			.execute();

		console.log(post.raw[0].length);

		return post.raw[0];
	}

	// delete post
	@Mutation(() => Boolean)
	@UseMiddleware(isAuthenticated)
	@UseMiddleware(isBanned)
	async deletePost(
		@Arg("id", ()=> Int) id: number,
		@Ctx() { req }: GraphQlCxt
	): Promise<boolean> {
		const post = await Post.findOne({
			where: { id, creatorId: req.session.userId },
		});

		if (!post) {
			return false;
		}

		await Post.delete({ id });

		return true;
	}
}
