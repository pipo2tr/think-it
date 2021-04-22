import { useRouter } from "next/router";
import React from "react";
import PostCards from "../../components/PostCards";
import PostLayout from "../../components/PostLayout";
import { usePostQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

const post = () => {
	const router = useRouter();
	const Id = parseInt(router.query.id as string);
	const { data } = usePostQuery({
		skip: !Id,
		variables: {
			id: Id,
		},
	});

	return (
		<PostLayout>
			{data?.post ? (
				<PostCards post={data.post} />
			) : (
				<div>Post doesn't exist</div>
			)}
		</PostLayout>
	);
};

export default withApollo({ ssr: true })(post);
