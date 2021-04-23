import React, { FC, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface AlertDialogInterface {
	title: string;
	text: string;
	handleClose: () => void;
	openDialog: boolean;
	handleAction: () => void;
}

const AlertDialog: FC<AlertDialogInterface> = ({
	handleClose,
	openDialog,
	text,
	title,
	handleAction,
}) => {
	return (
		<Dialog
			open={openDialog}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description" color="error">
					{text}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary" autoFocus>
					No
				</Button>
				<Button onClick={handleAction} color="primary">
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AlertDialog;
