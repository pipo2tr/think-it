import { withApollo as createWithApollo } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import {PaginatedComments, PaginatedPost} from "../generated/graphql"
const createClient = (ctx: NextPageContext) =>
	new ApolloClient({
		uri: "http://localhost:4000/graphql",
		credentials: "include",
		headers: {
			cookie:
				typeof window == "undefined" ? ctx?.req?.headers?.cookie : "",
		},
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						posts: {
							keyArgs: [],
							merge(
								existing: PaginatedPost | undefined,
								incoming: PaginatedPost
							): PaginatedPost {
								return {
									...incoming,
									posts: [
										...(existing?.posts || []),
										...incoming.posts,
									],
								};
							},
						},
						postsByUser: {
							keyArgs: [],
							merge(
								existing: PaginatedPost | undefined,
								incoming: PaginatedPost
							): PaginatedPost {
								return {
									...incoming,
									posts: [
										...(existing?.posts || []),
										...incoming.posts,
									],
								};
							},
						},
						commentsOnPost: {
							keyArgs: [],
							merge(
								existing: PaginatedComments | undefined,
								incoming: PaginatedComments
							): PaginatedComments {
								return {
									...incoming,
									comments: [
										...(existing?.comments || []),
										...incoming.comments,
									],
								};
							},
						},
					},
				},
			},
		}),
	});
export const withApollo = createWithApollo(createClient);
