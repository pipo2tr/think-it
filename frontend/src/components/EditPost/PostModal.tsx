import Modal from "@material-ui/core/Modal";
import React, { FC } from "react";
import { PostsType } from "../../utils/PostsType";
import EditPost from "./EditPost";

interface PostModalProps {
	handleClose: () => void;
	openModal: boolean;
}
const PostModal: FC<PostModalProps> = ({
	handleClose,
	openModal,
	children,
}) => {
	return (
		<div>
			<Modal
				open={openModal}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div className="content">{children}</div>
			</Modal>
		</div>
	);
};

export default PostModal;
