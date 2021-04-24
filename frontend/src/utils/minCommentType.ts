import { Scalars } from "../generated/graphql";

export type MinCommentType = {
    __typename?: 'PostComment';
    id: Scalars['Float'];
    text: Scalars['String'];
    userId: Scalars['Float'];
    postId: Scalars['Float'];
    user: {
		id: Scalars["Float"];
		username: Scalars["String"];
	};
    createdAt: Scalars['DateTime'];
  };