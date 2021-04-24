import { useRouter } from "next/router";
import React from "react";
import PostCards from "../../components/PostCard/PostCards";
import PostLayout from "../../components/Layout/PostLayout";
import { useCommentsOnPostQuery, usePostQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import BackDrop from "../../components/Utils/BackDrop";
import CommentAccordion from "../../components/CommentSection/CommentAccordian";

const post = () => {
	const router = useRouter();
	const Id = parseInt(router.query.id as string);
	const { data } = usePostQuery({
		skip: !Id,
		variables: {
			id: Id,
		},
	});
	const { data: commentData } = useCommentsOnPostQuery({
		skip: !Id,
		variables: {
			postId: Id,
			limit: 30,
			skip: 0,
		},
	});
	if (!data?.post) return <BackDrop />;
	return (
		<PostLayout>
			<PostCards post={data.post} />
			{commentData ? (
				commentData?.commentsOnPost?.comments?.map((comment) => (
					<CommentAccordion comment={comment} key={ comment.id}/>
				))
			) : (
				<div>This post has no comment</div>
			)}
		</PostLayout>
	);
};

export default withApollo({ ssr: true })(post);
