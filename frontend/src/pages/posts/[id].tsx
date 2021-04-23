import { useRouter } from "next/router";
import React from "react";
import PostCards from "../../components/PostCard/PostCards";
import PostLayout from "../../components/Layout/PostLayout";
import { usePostQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import BackDrop from "../../components/Utils/BackDrop";

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
				<BackDrop />
			)}
		</PostLayout>
	);
};

export default withApollo({ ssr: true })(post);
