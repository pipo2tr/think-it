import { Post } from "../entities/Post";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

@Resolver()
export class PostResolver {
	// Get one post
	@Query(() => Post, { nullable: true })
	async post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
		return Post.findOne(id);
	}

	// create post
	@Mutation(() => Post)
	async createPost(@Arg("text") text: string): Promise<Post> {
		return Post.create({ text }).save();
	}

	@Mutation(() => Post, { nullable: true })
	async updatePost(
		@Arg("id", () => Int) id: number,
		@Arg("text") text: string
	): Promise<Post> {
		const post = await getConnection()
			.createQueryBuilder()
			.update(Post)
			.set({ text })
			.where("id = :id", { id })
			.returning("*")
			.execute();

		console.log(post);

		return post.raw[0];
	}

	@Mutation(() => Boolean)
	async deletePost(@Arg("id") id: number): Promise<boolean> {
		const post = Post.findOne(id);

		if (!post) {
			return false;
		}

		await Post.delete({ id });

		return true;
	}
}
