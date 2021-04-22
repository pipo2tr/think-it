import { Menu, MenuItem } from "@material-ui/core";
import Link from "next/link";
import React, { FC } from "react";
import { PostsType } from "../utils/PostsType";

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
			<MenuItem>Delete</MenuItem>
		</Menu>
	);
};

export default PostMenu;
