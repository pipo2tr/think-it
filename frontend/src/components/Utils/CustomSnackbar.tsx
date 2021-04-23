import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC } from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import WarningIcon from "@material-ui/icons/Warning";
import InfoIcon from "@material-ui/icons/Info";

// Why did you make this ? Mui has an alert component already.
// Yeah, it didn't work on my machine, if it did on yours then please use that.

const ICONMAPPER = {
	success: <CheckCircleOutlineIcon />,
	error: <ErrorOutlineIcon />,
	info: <InfoIcon />,
	warn: <WarningIcon />,
};

interface CustomSnackbarProps {
	text: string;
	type: "success" | "error" | "info" | "warn";
	openSnackBar: boolean;
}
const CustomSnackbar: FC<CustomSnackbarProps> = ({
	text,
	type,
	openSnackBar,
}) => {
	return (
		<div style={{ width: "100%" }}>
			<Snackbar
				open={openSnackBar}
				autoHideDuration={3000}
			>
				<div className={`alert ${type}`}>
					{ICONMAPPER[type]}
					<span className="text">{text}</span>
				</div>
			</Snackbar>
		</div>
	);
};

export default CustomSnackbar;
