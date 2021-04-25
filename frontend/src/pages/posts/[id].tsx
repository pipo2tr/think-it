import { useRouter } from "next/router";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentAccordion from "../../components/CommentSection/CommentAccordian";
import PostLayout from "../../components/Layout/PostLayout";
import PostCards from "../../components/PostCard/PostCards";
import BackDrop from "../../components/Utils/BackDrop";
import { useCommentsOnPostQuery, usePostQuery } from "../../generated/graphql";
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
	const { data: commentData, fetchMore } = useCommentsOnPostQuery({
		skip: !Id,
		variables: {
			postId: Id,
			limit: 30,
			skip: 0,
		},
	});

	const fetchMoreComments = () => {
		fetchMore({
			variables: {
				postId: Id,
				limit: 30,
				skip: commentData.commentsOnPost.comments.length,
			},
		});
	};

	if (!data?.post) return <BackDrop />;
	return (
		<PostLayout>
			<PostCards post={data.post} />
			{commentData ? <InfiniteScroll
				dataLength={commentData?.commentsOnPost?.comments?.length} //This is important field to render the next data
				next={fetchMoreComments}
				hasMore={commentData?.commentsOnPost?.hasMore}
				loader={<h4>Loading...</h4>}
				endMessage={
					<p style={{ textAlign: "center" }}>
						<b>End of comments</b>
					</p>
				}
			>
				{commentData?.commentsOnPost?.comments?.map((comment) => (
					<CommentAccordion comment={comment} key={comment.id} />
				))}
			</InfiniteScroll> : null}
		</PostLayout>
	);
};

export default withApollo({ ssr: false })(post);


