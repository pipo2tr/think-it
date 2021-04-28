import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { COOKIE_NAME, COOKIE_SECRET, PROD } from "./consts";
import { buildSchema } from "type-graphql";
import { PostCommentResolver } from "./resolver/postComments";
import { Post } from "./entities/Post";
import { PostResolver } from "./resolver/post";
import Redis from "ioredis";
import session from "express-session";
import connsectRedis from "connect-redis";
import { UserResolver } from "./resolver/user";
import { User } from "./entities/User";
import cors from "cors";
import env from "dotenv";
import path from "path";
import { Vote } from "./entities/Vote";
import { PostComment } from "./entities/PostComment";
import { UserLoader } from "./utils/loaders/UserLoader";
import { VoteLoader } from "./utils/loaders/VoteLoader";

const main = async () => {
	env.config();
	const dbConnect = await createConnection({
		type: "postgres",
		url: process.env.DATABASE_URL,
		synchronize: true,
		logging: !PROD,
		entities: [Post, User, Vote, PostComment],
		migrations: [path.join(__dirname, "./migrations/*")],
	});
	await dbConnect.runMigrations();
	const app = express();

	app.set("trust proxy", 1);

	let RedisStore = connsectRedis(session);
	let redis = new Redis(process.env.REDIS_URL);

	app.use(
		session({
			name: COOKIE_NAME,
			store: new RedisStore({ client: redis, disableTouch: true }),
			secret: COOKIE_SECRET,
			resave: false,
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 69, //69 years 😉
				httpOnly: true,
				secure: PROD,
				sameSite: "lax",
			},
			saveUninitialized: false,
		})
	);

	app.use(
		cors({
			origin: ["http://localhost:3000", process.env.ORIGIN as string],
			credentials: true,
		})
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [PostCommentResolver, PostResolver, UserResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({
			req,
			res,
			redis,
			userLoader: UserLoader(),
			voteLoader: VoteLoader()
			
		}),
	});
	apolloServer.applyMiddleware({ app, cors: false });
	app.listen(process.env.PORT, () => {
		console.log("listening on http://localhost:4000/graphql");
	});
};
main();
