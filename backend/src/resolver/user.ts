import { User } from "../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { UserRegisterType } from "../utils/UserRegisterType";
import argon2 from "argon2";
import { GraphQlCxt } from "../types/GraphQlCtx";
import { UserResponse } from "../utils/Error&ResponseType";
import { registerValidator } from "../utils/registorValidator";
import { UserLoginType } from "../utils/UserLoginType";
@Resolver()
export class UserResolver {
	// returns the current logged in user
	@Query(() => User, { nullable: true })
	async loggedInUser(@Ctx() { req }: GraphQlCxt): Promise<User | undefined> {
		if (!req.session.userId) {
			return undefined;
		} else {
			return User.findOne({ where: { id: req.session.userId } });
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
						message: "User with that name or email dosen't exist",
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
}
