import { useRouter } from "next/router";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentAccordion from "../../components/CommentSection/CommentAccordian";
import PostLayout from "../../components/Layout/PostLayout";
import PostCards from "../../components/PostCard/PostCards";
import BackDrop from "../../components/Utils/BackDrop";
import PaginatorMessage from "../../components/Utils/Paginator";
import {
	useCommentsOnPostQuery,
	useMeQuery,
	usePostQuery,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

const post = () => {
	const router = useRouter();
	const { data: meData } = useMeQuery();
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
				skip: commentData!.commentsOnPost.comments.length,
			},
		});
	};

	if (!data?.post) return <BackDrop />;
	return (
		<PostLayout>
			<PostCards post={data.post} meData={meData?.me!} />
			{commentData ? (
				<InfiniteScroll
					dataLength={commentData?.commentsOnPost?.comments?.length} //This is important field to render the next data
					next={fetchMoreComments}
					hasMore={commentData?.commentsOnPost?.hasMore}
					loader={<h4>Loading...</h4>}
					endMessage={
						<PaginatorMessage
						text="This post has no more comments"
						/>
					}
				>
					{commentData?.commentsOnPost?.comments?.map((comment) => (
						<CommentAccordion comment={comment} key={comment.id} />
					))}
				</InfiniteScroll>
			) : (
				<BackDrop />
			)}
		</PostLayout>
	);
};

export default withApollo({ ssr: true })(post);
