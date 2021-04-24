import { Box } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Layout from "../../components/Layout/Layout";
import PostAccordion from "../../components/UserProfile/PostAccordian";
import ProfileCard from "../../components/UserProfile/ProfileCard";
import {
	useGetUserByIdQuery,
	usePostsByUserQuery,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			marginTop: theme.spacing(8),
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			fontWeight: theme.typography.fontWeightRegular,
		},
		hero: {
			backgroundImage: "",
			height: "auto",
			width: "100%",
			flexDirection: "row",
			justifyContent: "center",
			display: "flex",
			padding: "20px 0",
		},
		flex: {
			display: "flex",
			justifyContent: "space-between",
		},
		post: {
			margin: "auto",
		},
	})
);

const userProfile = () => {
	const classes = useStyles();
	const router = useRouter();
	const Id = parseInt(router.query.id as string);
	const { data } = useGetUserByIdQuery({
		skip: !Id,
		variables: {
			id: Id,
		},
	});
	const { data: postData, fetchMore } = usePostsByUserQuery({
		variables: {
			id: Id,
			limit: 10,
			skip: 0,
		},
	});
	const UserCard = (
		<Box className={classes.hero}>
			{data?.getUserById.errors ? (
				<Typography className={classes.heading}>
					{data?.getUserById.errors}
				</Typography>
			) : (
				<ProfileCard minUser={data?.getUserById?.user} />
			)}
		</Box>
	);

	const fetChMorePosts = () => {
		fetchMore({
			variables: {
				id: Id,
				limit: 10,
				skip: postData.postsByUser.posts.length,
			},
		});
	};
	const PostsAccordion = postData?.postsByUser?.posts.map((post) => (
		<PostAccordion post={post} key={ post.id}/>
	));

	return (
		<Layout layoutWidth="md">
			<div className={classes.root}>
				{data ? (
					UserCard
				) : (
					<Typography className={classes.heading}>
						Cannot fetch user
					</Typography>
				)}
			</div>
			<div className={classes.post}>
				{postData ? (
					<InfiniteScroll
						dataLength={postData?.postsByUser?.posts.length} //This is important field to render the next data
						next={fetChMorePosts}
						hasMore={postData?.postsByUser?.hasMore}
						loader={<h4>Loading...</h4>}
						endMessage={
							<p style={{ textAlign: "center" }}>
								<b>User Has no more posts</b>
							</p>
						}
					>
						{PostsAccordion}
					</InfiniteScroll>
				) : (
					<div>Loading...</div>
				)}
			</div>
		</Layout>
	);
};

export default withApollo({ ssr: true })(userProfile);
