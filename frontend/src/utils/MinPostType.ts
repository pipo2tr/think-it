import { Scalars } from "../generated/graphql";

export type MinPostType = {
	__typename?: "Post";
	id: Scalars["Float"];
	text: Scalars["String"];
	points: Scalars["Float"];
	createdAt: Scalars["DateTime"];
};
