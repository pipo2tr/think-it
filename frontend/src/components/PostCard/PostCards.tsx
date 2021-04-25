import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ShareIcon from "@material-ui/icons/Share";
import Link from "next/link";
import React, { FC, useState } from "react";
import { useMeQuery } from "../../generated/graphql";
import { PostsType } from "../../utils/PostsType";
import EditPost from "../EditPost/EditPost";
import PostModal from "../EditPost/PostModal";
import PostMenu from "./PostMenu";
import VotingSection from "./VotingSection";
import CommentButton from "../CommentSection/CommentButton";
import AddCommentModal from "../CommentSection/AddCommentModal";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: "100%",
			width: "auto",
			margin: "3px",
			boxShadow: "2px 2px 2px #888888",
			height: "auto",
			[theme.breakpoints.up("md")]: {
				minWidth: "80%",
			},
		},
		expandOpen: {
			transform: "rotate(180deg)",
		},
		avatar: {
			backgroundColor: red[500],
			cursor: "pointer",
		},
		text: {
			cursor: "pointer",
			fontSize: "14px",
		},
		title: {
			fontSize: "16px",
			fontWeight: 400,
		},
		action: {
			display: "flex",
			justifyContent: "space-around",
			alignItems: "center",
			padding: "0",
		},
	})
);
interface PostCardInterface {
	post: PostsType;
}
const PostCards: FC<PostCardInterface> = ({ post }) => {
	const classes = useStyles();
	const { data: meData } = useMeQuery();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [openModal, setOpen] = useState(false);
	const [openCommentModal, setOpenCommentModal] = useState(false)
	const modalOpener = () => {
		setOpen(true);
	};

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setOpen(false);
	};
	const handleCloseCommentModal = () => {
		setOpenCommentModal(false)
	};
	const handleOpenCommentModal = () => {
		setOpenCommentModal(true)
	}
	return (
		<Card className={classes.root} key={post.id}>
			<CardHeader
				avatar={
					<Link href="/user/[id]" as={`/user/${post.creatorId}`}>
						<Avatar
							aria-label="post"
							className={classes.avatar}
							alt={post.creator.username}
							src="/static/img/pfp.jpg"
						/>
					</Link>
				}
				action={
					post.creatorId === meData?.me?.id ? (
						<IconButton aria-label="settings" onClick={handleMenu}>
							<MoreHorizIcon />
						</IconButton>
					) : null
				}
				title={
					<div className={classes.title}>
						@{post.creator.username}
					</div>
				}
				subheader={post.createdAt.split("T")[0]}
			/>
			<CardContent>
				<Link href="/posts/[id]" as={`/posts/${post.id}`}>
					<Typography
						variant="subtitle1"
						color="textSecondary"
						component="div"
						className={classes.text}
					>
						{post.text}
					</Typography>
				</Link>
			</CardContent>
			{meData?.me ? (
				<CardActions className={classes.action}>
					<VotingSection
						id={post.id}
						voteStatus={post.voteStatus}
						points={post.points}
					/>
					<IconButton aria-label="share">
						<ShareIcon />
					</IconButton>
					<CommentButton points={post.numComments} handleOpen={ handleOpenCommentModal}/>
				</CardActions>
			) : null}
			<PostMenu
				anchorEl={anchorEl}
				handleClose={handleClose}
				open={open}
				post={post}
				modalOpener={modalOpener}
			/>
			<PostModal handleClose={handleClose} openModal={openModal}>
				<EditPost post={post} handleClose={handleClose} />
			</PostModal>
			<PostModal handleClose={handleCloseCommentModal} openModal={openCommentModal}>
				<AddCommentModal postId={post.id} handleClose={handleCloseCommentModal} />
			</PostModal>
		</Card>
	);
};

export default PostCards;
