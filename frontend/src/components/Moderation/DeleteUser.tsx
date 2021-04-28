import { Tooltip, IconButton } from "@material-ui/core";
import React, { FC, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useAdminDeleteUserMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import AlertDialog from "../Utils/AlertDialog";

interface DeleteUserProps {
	id: number;
}

const DeleteUser: FC<DeleteUserProps> = ({ id }) => {
	const router = useRouter();
	const [deleteUser] = useAdminDeleteUserMutation();
	const [openModal, setOpenModal] = useState(false);
	const handleDeleteUser = () => {
		deleteUser({
			variables: {
				id,
			},
			update: (cache) => {
				cache.evict({ fieldName: "getUserById" });
				cache.evict({ fieldName: "posts" });
			},
		});
		router.push("/");
	};
	const handleOpenModal = () => {
		setOpenModal(true);
	};
	const handleCloseModal = () => {
		setOpenModal(false);
	};
	return (
		<>
			<Tooltip title="Delete User" aria-label="delete-user">
				<IconButton aria-label="delete user" onClick={handleOpenModal}>
					<DeleteIcon style={{ color: "red" }} />
				</IconButton>
			</Tooltip>
			<AlertDialog
				openDialog={openModal}
				handleClose={handleCloseModal}
				text="This action is irreversible and will delete all the posts from this user"
				title={`Delete user id:${id}`}
				handleAction={handleDeleteUser}
			/>
		</>
	);
};

export default DeleteUser;
