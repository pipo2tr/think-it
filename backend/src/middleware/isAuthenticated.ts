import { MiddlewareFn } from "type-graphql";
import { GraphQlCxt } from "../types/GraphQlCtx";

export const isAuthenticated: MiddlewareFn<GraphQlCxt> = ({ context }, next) : Promise<any> => {
    if (!context.req.session.userId) {
        throw new Error("Not Authenticated");
    }
    return next()
};
