import { Box, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Layout from "../../components/Layout/Layout";
import TabContainer from "../../components/Tabs/TabContainer";
import TabPanel from "../../components/Tabs/TabPanel";
import PostAccordion from "../../components/UserProfile/PostAccordian";
import ProfileCard from "../../components/UserProfile/ProfileCard";
import ProfileCommentAccordian from "../../components/UserProfile/ProfileCommentAccordian";
import BackDrop from "../../components/Utils/BackDrop";
import PaginatorMessage from "../../components/Utils/Paginator";
import {
	useCommentsByUserQuery,
	useGetUserByIdQuery,
	useMeQuery,
	usePostsByUserQuery,
} from "../../generated/graphql";
import { useIsAuth } from "../../hooks/useisAuth";
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
	useIsAuth();
	const classes = useStyles();
	const router = useRouter();
	const { data: meData } = useMeQuery();
	const [panel, setPanel] = useState(0);
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
			limit: 30,
			skip: 0,
		},
	});

	const {
		data: dataComment,
		fetchMore: fetchMoreComments,
	} = useCommentsByUserQuery({
		variables: {
			userId: Id,
			limit: 30,
			skip: 0,
		},
	});

	const handlePanel = (event: React.ChangeEvent<{}>, newValue: number) => {
		setPanel(newValue);
	};

	const UserCard = (
		<Box className={classes.hero}>
			<ProfileCard minUser={data?.getUserById?.user!} me={meData?.me!} />
		</Box>
	);

	const fetChMorePosts = () => {
		fetchMore({
			variables: {
				id: Id,
				limit: 30,
				skip: postData!.postsByUser!.posts.length,
			},
		});
	};

	const getMoreComments = () => {
		fetchMoreComments({
			variables: {
				userId: Id,
				limit: 10,
				skip: dataComment!.commentsByUser!.comments.length,
			},
		});
	};

	const PostsAccordion = postData?.postsByUser?.posts.map((post) => (
		<PostAccordion post={post} key={post.id} />
	));
	const CommentAccordian = dataComment?.commentsByUser?.comments.map(
		(comment) => (
			<ProfileCommentAccordian comment={comment} key={comment.id} />
		)
	);
	const UserPost = (
		<div className={classes.post}>
			<InfiniteScroll
				dataLength={postData?.postsByUser?.posts.length as number} //This is important field to render the next data
				next={fetChMorePosts}
				hasMore={postData?.postsByUser?.hasMore as boolean}
				loader={<h4>Loading...</h4>}
				endMessage={<PaginatorMessage text="User has no more posts" />}
			>
				{PostsAccordion}
			</InfiniteScroll>
		</div>
	);
	const UserComments = (
		<div className={classes.post}>
			<InfiniteScroll
				dataLength={
					dataComment?.commentsByUser?.comments?.length as number
				} //This is important field to render the next data
				next={getMoreComments}
				hasMore={dataComment?.commentsByUser?.hasMore as boolean}
				loader={<h4>Loading...</h4>}
				endMessage={
					<PaginatorMessage text="User has no more comments" />
				}
			>
				{CommentAccordian}
			</InfiniteScroll>
		</div>
	);

	if (data?.getUserById?.errors) {
		return (
			<Layout layoutWidth="md">
				<div className={classes.root}>User No longer exists</div>
			</Layout>
		);
	}

	return (
		<Layout layoutWidth="md">
			<div className={classes.root}>{data ? UserCard : <BackDrop />}</div>
			<TabPanel panel={panel} handlePanel={handlePanel}>
				<TabContainer index={0} value={panel}>
					{postData ? UserPost : <BackDrop />}
				</TabContainer>
				<TabContainer index={1} value={panel}>
					{dataComment ? UserComments : <BackDrop />}
				</TabContainer>
			</TabPanel>
		</Layout>
	);
};

export default withApollo({ ssr: true })(userProfile);
