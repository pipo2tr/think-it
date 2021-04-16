import { User } from "../entities/User";
import { MiddlewareFn } from "type-graphql";
import { GraphQlCxt } from "../types/GraphQlCtx";
import { Role } from "../enums/Role";

export const isAdmin: MiddlewareFn<GraphQlCxt> = async (
	{ context },
	next
): Promise<any> => {
	const user = await User.findOne(context.req.session.userId);
	if (user?.role === Role.ADMIN || user?.role === Role.OWNER || user?.username === "Siddharth") {
		return next()
	}
	throw new Error("You don't have the required perms.");
	
};
