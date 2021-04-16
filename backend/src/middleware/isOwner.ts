import { User } from "../entities/User";
import { MiddlewareFn } from "type-graphql";
import { GraphQlCxt } from "../types/GraphQlCtx";
import { Role } from "../enums/Role";

export const isOwner: MiddlewareFn<GraphQlCxt> = async (
	{ context },
	next
): Promise<any> => {
	const user = await User.findOne(context.req.session.userId);
	if (!(user?.username === "Siddharth" || user?.role === Role.OWNER)) {
        throw new Error("You are not the owner");
	}
	return next();
};
