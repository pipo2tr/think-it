import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { COOKIE_NAME, COOKIE_SECRET, PROD } from "./consts";
import { buildSchema } from "type-graphql";
import { TestResolver } from "./resolver/test";
import { Post } from "./entities/Post";
import { PostResolver } from "./resolver/post";
import Redis from "ioredis";
import session from "express-session";
import connsectRedis from "connect-redis";
import { UserResolver } from "./resolver/user";
import { User } from "./entities/User";
import cors from "cors";
import env from "dotenv"
const main = async () => {
	env.config()
	const dbConnect = await createConnection({
		type: "postgres",
		database: "thinkit",
		username: "postgres",
		password: "siddharth",
		synchronize: true,
		logging: !PROD,
		entities: [Post, User],
	});

	let RedisStore = connsectRedis(session);
	let redis = new Redis();

	const app = express();

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

	app.use(cors({ origin: ["http://localhost:3000", process.env.ORIGIN as string], credentials: true }));

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [TestResolver, PostResolver, UserResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({
			req,
			res,
			redis,
		}),
	});
	apolloServer.applyMiddleware({ app, cors: false });
	app.listen(5000, () => {
		console.log("listening on http://localhost:5000/graphql");
	});
};
main();
