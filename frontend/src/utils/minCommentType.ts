import { Scalars } from "../generated/graphql";

export type minCommentType = {
    __typename?: 'PostComment';
    id: Scalars['Float'];
    text: Scalars['String'];
    postId: Scalars['Float'];
    createdAt: Scalars['DateTime'];
  };