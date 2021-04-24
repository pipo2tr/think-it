import DataLoader from "dataloader";
import { Request, Response } from "express";
import session from "express-session";
import { Redis } from "ioredis";
import { User } from "../entities/User";
import { Vote } from "../entities/Vote";

export type GraphQlCxt = {
	req: Request & {
		session: session.Session &
			Partial<session.SessionData> & {
				userId: number;
			};
	};
	res: Response;
	redis: Redis;
	userLoader: DataLoader<number, User, number>;
	voteLoader: DataLoader<
		{
			postId: number;
			userId: number;
		},
		Vote,
		null
	>;
};
