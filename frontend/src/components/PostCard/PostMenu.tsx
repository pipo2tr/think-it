import { Menu, MenuItem } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { FC } from "react";
import { useDeletePostMutation } from "../../generated/graphql";
import { PostsType } from "../../utils/PostsType";
import CreateIcon from "@material-ui/icons/Create";
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

	const removePost = async (id: number) => {
		await deletePost({
			variables: { id },
			update: (cache) => {
				cache.evict({ fieldName: "posts" });
			},
		});
	};
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
			<MenuItem onClick={modalOpener}>
				<CreateIcon style={{ color: "blue" }}/>
			</MenuItem>
			<MenuItem onClick={() => removePost(post.id)}>
				<DeleteIcon style={{ color: "red" }} />
			</MenuItem>
		</Menu>
	);
};

export default PostMenu;
