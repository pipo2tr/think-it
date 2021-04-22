import { Scalars } from "../generated/graphql";

export type MinUserType = {
    __typename?: 'User';
    id: Scalars['Float'];
    username: Scalars['String'];
    role: Scalars['Float'];
    createdAt: Scalars['DateTime'];
  };