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
import { getConnection } from "typeorm";
import { GraphQlCxt } from "../types/GraphQlCtx";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { User } from "../entities/User";
import { UserLoader } from "../utils/UserLoader";

@Resolver(Post)
export class PostResolver {
	// fetch creator data
	@FieldResolver(() => User)
	creator(@Root() post: Post) {
		return UserLoader.load(post.creatorId);
	}

	@Query(() => [Post])
	async myPosts(@Ctx(){req}: GraphQlCxt) :Promise<Post[] | undefined>{
		return Post.find({where: {creatorId: req.session.userId}})
	}	

	// Get one post
	@Query(() => Post, { nullable: true })
	async post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
		return Post.findOne(id);
	}

	@Query(() => [Post])
	async posts(): Promise<Post[]> {
		return Post.find({});
	}

	// create post
	@Mutation(() => Post)
	async createPost(
		@Arg("text") text: string,
		@Ctx() { req }: GraphQlCxt
	): Promise<Post> {
		return Post.create({ text, creatorId: req.session.userId }).save();
	}

	// update post
	@Mutation(() => Post, { nullable: true })
	@UseMiddleware(isAuthenticated)
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

		console.log(post);

		return post.raw[0];
	}

	// delete post
	@Mutation(() => Boolean)
	@UseMiddleware(isAuthenticated)
	async deletePost(
		@Arg("id") id: number,
		@Ctx() { req }: GraphQlCxt
	): Promise<boolean> {
		const post = Post.findOne({
			where: { id, creatorId: req.session.userId },
		});

		if (!post) {
			return false;
		}

		await Post.delete({ id });

		return true;
	}
}
