import argon2 from "argon2";
import { Role } from "../enums/Role";
import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { COOKIE_NAME } from "../consts";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { isOwner } from "../middleware/isOwner";
import { GraphQlCxt } from "../types/GraphQlCtx";
import { UserResponse } from "../utils/Error&ResponseType";
import { registerValidator } from "../utils/registorValidator";
import { UserLoginType } from "../utils/UserLoginType";
import { UserRegisterType } from "../utils/UserRegisterType";
import { isAdmin } from "../middleware/isAdmin";
@Resolver(User)
export class UserResolver {
	// returns the current logged in user
	@Query(() => User, { nullable: true })
	async me(@Ctx() { req }: GraphQlCxt): Promise<User | undefined> {
		if (!req.session.userId) {
			return undefined;
		} else {
			return User.findOne(req.session.userId);
		}
	}

	// create user
	@Mutation(() => UserResponse)
	async register(
		@Arg("input") input: UserRegisterType,
		@Ctx() { req }: GraphQlCxt
	): Promise<UserResponse> {
		const errors = registerValidator(input);
		if (errors) {
			return { errors };
		}
		const hashedPassword = await argon2.hash(input.password);
		let user;
		try {
			const createUser = await getConnection()
				.createQueryBuilder()
				.insert()
				.into(User)
				.values([
					{
						username: input.username,
						password: hashedPassword,
						email: input.email,
					},
				])
				.returning("*")
				.execute();

			user = createUser.raw[0];
		} catch (err) {
			// Duplicate username or email error
			if (err.code === "23505" && err.detail.includes("username"))
				return {
					errors: [
						{
							field: "username",
							message: "User already exists",
						},
					],
				};
			else if (err.code === "23505" && err.detail.includes("email")) {
				return {
					errors: [
						{
							field: "email",
							message: "Email already exists",
						},
					],
				};
			}
		}

		req.session.userId = user.id;

		return { user };
	}

	// login user
	@Mutation(() => UserResponse)
	async login(
		@Arg("input") input: UserLoginType,
		@Ctx() { req }: GraphQlCxt
	): Promise<UserResponse> {
		if (!input.usernameOremail) {
			return {
				errors: [
					{
						field: "usernameOremail",
						message: "Please provide usernameOremail",
					},
				],
			};
		} else if (!input.password) {
			return {
				errors: [
					{
						field: "password",
						message: "Please provide password",
					},
				],
			};
		}

		const user = await User.findOne(
			input.usernameOremail.includes("@")
				? { where: { email: input.usernameOremail } }
				: { where: { username: input.usernameOremail } }
		);

		if (!user) {
			return {
				errors: [
					{
						field: "usernameOremail",
						message: "User with that name or email doesn't exist",
					},
				],
			};
		}

		const validPassword = await argon2.verify(
			user.password,
			input.password
		);
		if (!validPassword) {
			return {
				errors: [
					{
						field: "password",
						message: "Invalid password",
					},
				],
			};
		}

		req.session.userId = user.id;
		return { user };
	}

	// logout user
	@Mutation(() => Boolean)
	async logout(@Ctx() { req, res }: GraphQlCxt) {
		return new Promise((resolve) =>
			req.session.destroy((err) => {
				if (err) {
					console.log(err);
					resolve(false);
					return;
				}
				res.clearCookie(COOKIE_NAME);
				resolve(true);
			})
		);
	}

	// Ban a user so they can only read posts.
	@Mutation(() => UserResponse)
	@UseMiddleware(isAuthenticated)
	@UseMiddleware(isAdmin)
	async ban(@Arg("id") id: number): Promise<UserResponse> {
		const user = await User.findOne(id);

		if (!user) {
			return {
				errors: [
					{
						field: "user",
						message: "user doesn't exist",
					},
				],
			};
		}
		else if (user.role === Role.OWNER) {
			return {
				errors: [
					{
						field: "ban",
						message: "lol, cannot ban owner",
					},
				],
			};
		}
		else if (user.role === Role.BANNED) {
			return {
				errors: [
					{
						field: "ban",
						message: "user already banned",
					},
				],
			};
		}

		const banned = await getConnection()
			.createQueryBuilder()
			.update(User)
			.set({ role: Role.BANNED })
			.where("id = :id", {
				id,
			})
			.returning("*")
			.execute();

		console.log("Banned user :", banned.raw[0]);
		return { user: banned.raw[0] };
	}

	// Unban a user so they can post.
	@Mutation(() => UserResponse)
	@UseMiddleware(isAuthenticated)
	@UseMiddleware(isAdmin)
	@UseMiddleware(isOwner)
	async unban(@Arg("id") id: number): Promise<UserResponse> {
		const user = await User.findOne(id);

		if (!user) {
			return {
				errors: [
					{
						field: "user",
						message: "user doesn't exist",
					},
				],
			};
		}
		else if (user.role !== Role.BANNED) {
			return {
				errors: [
					{
						field: "ban",
						message: "user already not banned",
					},
				],
			};
		}

		const banned = await getConnection()
			.createQueryBuilder()
			.update(User)
			.set({ role: Role.USER })
			.where("id = :id", {
				id,
			})
			.returning("*")
			.execute();

		console.log("Unbanned user :", banned.raw[0]);
		return { user: banned.raw[0] };
	}

	// Change user role
	@Mutation(() => UserResponse)
	@UseMiddleware(isAuthenticated)
	@UseMiddleware(isOwner)
	async makeAdmin(
		@Arg("id") id: number
	): Promise<UserResponse> {
		const user = await User.findOne(id);

		if (!user) {
			return {
				errors: [
					{
						field: "user",
						message: "user doesn't exist",
					},
				],
			};
		}
		else if (user.role === Role.ADMIN || user.role === Role.OWNER) {
			return {
				errors: [
					{
						field: "role",
						message:
							"the following user is already an admin or owner",
					},
				],
			};
		}

		const roled = await getConnection()
			.createQueryBuilder()
			.update(User)
			.set({ role: Role.ADMIN })
			.where("id = :id", {
				id,
			})
			.returning("*")
			.execute();

		return { user: roled.raw[0] };
	}

	@Mutation(() => UserResponse)
	@UseMiddleware(isAuthenticated)
	@UseMiddleware(isOwner)
	async makeOwner(
		@Arg("id") id: number
	): Promise<UserResponse> {
		const user = await User.findOne(id);

		if (!user) {
			return {
				errors: [
					{
						field: "user",
						message: "user doesn't exist",
					},
				],
			};
		}
		else if (user.role === Role.OWNER) {
			return {
				errors: [
					{
						field: "role",
						message:
							"the following user is already an admin or owner",
					},
				],
			};
		}

		const roled = await getConnection()
			.createQueryBuilder()
			.update(User)
			.set({ role: Role.OWNER })
			.where("id = :id", {
				id,
			})
			.returning("*")
			.execute();

		return { user: roled.raw[0] };
	}

	// Delete user, can only be performed by Owner
	@Mutation(() => Boolean)
	@UseMiddleware(isAuthenticated)
	@UseMiddleware(isOwner)
	async admin_deleteUser(
		@Arg("id") id: number
	): Promise<Boolean> {
		const user = await User.findOne(id);

		if (!user) {
			return false
		}
		else if (user.role === Role.OWNER) {
			return false
		}
		Post.delete({ creatorId: id });
		User.delete({ id });
		return true
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuthenticated)
	async deleteMe(@Ctx() { req, res }: GraphQlCxt): Promise<Boolean> {
		const userId = req.session.userId;
		Post.delete({ creatorId: userId });
		User.delete({ id: userId });
		return new Promise((resolve) =>
			req.session.destroy((err) => {
				if (err) {
					console.log(err);
					resolve(false);
					return;
				}
				res.clearCookie(COOKIE_NAME);
				resolve(true);
			})
		);
	}
}
