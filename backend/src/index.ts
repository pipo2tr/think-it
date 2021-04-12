import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { PROD } from "./consts";
import { buildSchema } from "type-graphql";
import { TestResolver } from "./resolver/test";
import { Post } from "./entities/Post";
import { PostResolver } from "./resolver/post";
const main = async () => {
	const dbConnect = await createConnection({
		type: "postgres",
		database: "thinkit",
		username: "postgres",
		password: "siddharth",
		synchronize: true,
		logging: !PROD,
		entities: [Post],
	});

	const app = express();
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [TestResolver, PostResolver],
			validate: false,
		}),
	});
	apolloServer.applyMiddleware({ app });
	app.listen(5000, () => {
		console.log("listening on http://localhost:5000/graphql");
	});
};
main();
