import { IconButton, Tooltip } from "@material-ui/core";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { useBanMutation } from "../../generated/graphql";
import AlertDialog from "../Utils/AlertDialog";

interface BanUserProps {
	id: number;
}

const BanUser: FC<BanUserProps> = ({ id }) => {
	const [banUser] = useBanMutation();
	const [openModal, setOpenModal] = useState(false);
	const handleBanUser = () => {
		banUser({
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
					<RemoveCircleIcon style={{ color: "red" }} />
				</IconButton>
			</Tooltip>
			<AlertDialog
				openDialog={openModal}
				handleClose={handleCloseModal}
				text="The following user will bw banned from posting, commenting, liking posts"
				title={`Ban user id:${id}`}
				handleAction={handleBanUser}
			/>
		</>
	);
};

export default BanUser;
