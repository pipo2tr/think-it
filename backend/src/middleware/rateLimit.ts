import { GraphQlCxt } from "src/types/GraphQlCtx";
import { MiddlewareFn } from "type-graphql";
const TWELVE_HOURS = 60 * 60 * 12;
export const rateLimit: (limit?: number) => MiddlewareFn<GraphQlCxt> = (
	limit = 50
) => async ({ context: { req, redis }, info }, next) => {
	const key = `rate-limit:${info.fieldName}:${req.ip}`;

	const current = await redis.incr(key);
	if (current > limit) {
		throw new Error("You're being rate limited, slow down");
	} else if (current === 1) {
		await redis.expire(key, TWELVE_HOURS);
	}

	return next();
};
