import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostLayout from "../components/Layout/PostLayout";
import PostCards from "../components/PostCard/PostCards";
import BackDrop from "../components/Utils/BackDrop";
import PaginatorMessage from "../components/Utils/Paginator";
import {
	MinUserFragment,
	useMeQuery,
	usePostsQuery,
} from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Home = () => {
	const { data: meData } = useMeQuery();

	const { data, fetchMore } = usePostsQuery({
		variables: {
			limit: 30,
			skip: 0,
		},
	});
	const moreData = () => {
		fetchMore({
			variables: {
				limit: 30,
				skip: data?.posts.posts.length,
			},
		});
	};
	if (!data) {
		return (
			<PostLayout>
				<BackDrop />
			</PostLayout>
		);
	}
	return (
		<PostLayout>
			{data ? (
				<InfiniteScroll
					dataLength={data?.posts?.posts?.length} //This is important field to render the next data
					next={moreData}
					hasMore={data?.posts?.hasMore}
					loader={<h5>Loading...</h5>}
					endMessage={
						<PaginatorMessage text="No more posts available." />
					}
				>
					{data?.posts?.posts?.map((post) => (
						<PostCards
							post={post}
							meData={meData as MinUserFragment}
							key={post.id}
						/>
					))}
				</InfiniteScroll>
			) : null}
		</PostLayout>
	);
};

export default withApollo({ ssr: true })(Home);
