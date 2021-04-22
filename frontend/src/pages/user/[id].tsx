import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Layout from "../../components/Layout";
import { withApollo } from "../../utils/withApollo";
import Container from "@material-ui/core/Container";
import { Box, Button } from "@material-ui/core";
import ProfileCard from "../../components/ProfileCard";
import {
	useGetUserByIdQuery,
	usePostsByUserQuery,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			marginTop: theme.spacing(8),
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		accordion: {
			width: "100%",
			[theme.breakpoints.up("sm")]: {
				width: "60%",
			},
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
		<Accordion className={classes.accordion} key={post.id}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>
					Posted On : {post.createdAt.split("T")[0]}
				</Typography>
				<Typography className={classes.heading}>
					Likes: {post.points}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Typography>{post.text}</Typography>
			</AccordionDetails>
		</Accordion>
	));

	return (
		<Layout>
			<Container component="main" maxWidth="xl">
				<div className={classes.root}>
					{data ? (
						UserCard
					) : (
						<Typography className={classes.heading}>
							Cannot fetch user
						</Typography>
					)}
				</div>
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
			</Container>
		</Layout>
	);
};

export default withApollo({ ssr: true })(userProfile);
