import { User } from "../entities/User";
import { MiddlewareFn } from "type-graphql";
import { GraphQlCxt } from "../types/GraphQlCtx";
import { Role } from "../enums/Role";

export const isBanned: MiddlewareFn<GraphQlCxt> = async (
	{ context },
	next
): Promise<any> => {
	const user = await User.findOne(context.req.session.userId);
	if (user?.role === Role.BANNED) {
		throw new Error("This username is banned, please contact the owner.");
	}
	return next();
};
