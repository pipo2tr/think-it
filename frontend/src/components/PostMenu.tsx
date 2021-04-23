import { Menu, MenuItem } from "@material-ui/core";
import Link from "next/link";
import React, { FC } from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";
import { PostsType } from "../utils/PostsType";
import DeleteIcon from "@material-ui/icons/Delete";

interface PostMenuInterface {
	anchorEl: HTMLElement | null;
	handleClose: () => void;
	open: boolean;
	post: PostsType;
	modalOpener: () => void;
}

const PostMenu: FC<PostMenuInterface> = ({
	anchorEl,
	handleClose,
	open,
	post,
	modalOpener,
}) => {
	const [deletePost] = useDeletePostMutation()

	const removePost = async (id: number) => {
		await deletePost({
			variables: { id },
			update: (cache) => {
				cache.evict({ fieldName: "posts" })
			}
		})
	}
	return (
		<Menu
			id="menu-appbar"
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={open}
			onClose={handleClose}
		>
			<MenuItem onClick={modalOpener}>Edit</MenuItem>
			<MenuItem onClick = {()=> removePost(post.id)}><DeleteIcon />Delete</MenuItem>
		</Menu>
	);
};

export default PostMenu;
