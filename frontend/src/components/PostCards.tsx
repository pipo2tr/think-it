import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ShareIcon from "@material-ui/icons/Share";
import Link from "next/link";
import React, { FC, useState } from "react";
import { useMeQuery } from "../generated/graphql";
import { PostsType } from "../utils/PostsType";
import EditModal from "./EditModal";
import PostMenu from "./PostMenu";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: "100%",
			width:"auto",
			margin:"3px",
			boxShadow: "2px 2px 2px #888888",
			height: "auto",
			[theme.breakpoints.up("md")]: {
				minWidth:"80%"
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
	const [openModal, setOpen] = React.useState(false);

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
	return (
		<Card className={classes.root} key={post.id}>
			<CardHeader
				avatar={
					<Link href="/user/[id]" as={`/user/${post.creatorId}`}>
						<Avatar
							aria-label="post"
							className={classes.avatar}
							alt={post.creator.username}
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
				title={`@${post.creator.username}`}
				subheader={post.createdAt.split("T")[0]}
			/>
			<CardContent>
				<Link href="/posts/[id]" as={`/posts/${post.id}`}>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
						className={classes.text}
					>
						{post.text}
					</Typography>
				</Link>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="like">
					<FavoriteTwoToneIcon color="secondary" />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
			</CardActions>
			<PostMenu
				anchorEl={anchorEl}
				handleClose={handleClose}
				open={open}
				post={post}
				modalOpener={modalOpener}
			/>
			<EditModal
				handleClose={handleClose}
				openModal={openModal}
				post={post}
			/>
		</Card>
	);
};

export default PostCards;
