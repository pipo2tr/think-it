import { Scalars } from "../generated/graphql";

export type PostsType = {
	__typename?: "Post";
	id: Scalars["Float"];
	text: Scalars["String"];
	points: Scalars["Float"];
	creatorId: Scalars["Float"];
	creator: {
		id: Scalars["Float"];
		username: Scalars["String"];
	};
	createdAt: Scalars["DateTime"];
	updatedAt: Scalars["DateTime"];
};
