import { IconButton, Tooltip } from "@material-ui/core";
import HealingIcon from "@material-ui/icons/Healing";
import React, { FC, useState } from "react";
import { useUnbanMutation } from "../../generated/graphql";
import AlertDialog from "../Utils/AlertDialog";

interface UnbanUserProps {
	id: number;
}

const UnbanUser: FC<UnbanUserProps> = ({ id }) => {
	const [unban] = useUnbanMutation();
	const [openModal, setOpenModal] = useState(false);
	const handleUnbanUser = () => {
		unban({
			variables: {
				id,
			},
			update: (cache) => {
				cache.evict({ fieldName: "getUserById" });
			},
		});
	};
	const handleOpenModal = () => {
		setOpenModal(true);
	};
	const handleCloseModal = () => {
		setOpenModal(false);
	};
	return (
		<>
			<Tooltip title="Ban User" aria-label="ban-user">
				<IconButton aria-label="ban-user" onClick={handleOpenModal}>
					<HealingIcon style={{ color: "green" }} />
				</IconButton>
			</Tooltip>
			<AlertDialog
				openDialog={openModal}
				handleClose={handleCloseModal}
				text="The following user will be Unbanned from posting, commenting, liking posts"
				title={`Unban user id:${id}`}
				handleAction={handleUnbanUser}
			/>
		</>
	);
};

export default UnbanUser;
