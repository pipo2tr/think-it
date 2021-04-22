import React, { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { PostsType } from "../utils/PostsType";
import EditPost from "./EditPost";





interface EditModalProps {
	handleClose: () => void;
	openModal: boolean;
	post: PostsType;
}
const EditModal: FC<EditModalProps> = ({ handleClose, openModal, post }) => {
	

	return (
		<div>
			<Modal
				open={openModal}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div className="content">
					<EditPost post={post} handleClose={ handleClose}/>
				</div>
			</Modal>
		</div>
	);
};

export default EditModal;
