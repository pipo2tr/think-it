import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostLayout from "../components/Layout/PostLayout";
import PostCards from "../components/PostCard/PostCards";
import BackDrop from "../components/Utils/BackDrop";
import { usePostsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Home = () => {
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
				skip: data.posts.posts.length,
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
			<InfiniteScroll
				dataLength={data?.posts?.posts?.length} //This is important field to render the next data
				next={moreData}
				hasMore={data?.posts?.hasMore}
				loader={<h4>Loading...</h4>}
				endMessage={
					<p style={{ textAlign: "center" }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
			>
				{!data ? (
					<div>Loading...</div>
				) : (
					data?.posts?.posts?.map((post) => (
						<PostCards post={post} key={post.id} />
					))
				)}
			</InfiniteScroll>
		</PostLayout>
	);
};

export default withApollo({ ssr: true })(Home);
