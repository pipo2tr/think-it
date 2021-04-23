import { Menu, MenuItem } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { FC, useState } from "react";
import { useDeletePostMutation } from "../../generated/graphql";
import { PostsType } from "../../utils/PostsType";
import CreateIcon from "@material-ui/icons/Create";
import CustomSnackbar from "../Utils/CustomSnackbar";
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
	const [deletePost] = useDeletePostMutation();
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const removePost = async (id: number) => {
		await deletePost({
			variables: { id },
			update: (cache) => {
				cache.evict({ fieldName: "posts" });
			},
		});
	};
	return (
		<>
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
				<MenuItem onClick={modalOpener}>
					<CreateIcon style={{ color: "blue" }} />
				</MenuItem>
				<MenuItem
					onClick={() => {
						removePost(post.id);
						setOpenSnackbar(true);
					}}
				>
					<DeleteIcon style={{ color: "red" }} />
				</MenuItem>
			</Menu>
			<CustomSnackbar
				text="Successfully deleted post"
				type="success"
				openSnackBar={openSnackbar}
			/>
		</>
	);
};

export default PostMenu;
