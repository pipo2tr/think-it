import Snackbar from "@material-ui/core/Snackbar";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import React, { FC } from "react";

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
	handleclose?:()=> void
}
const CustomSnackbar: FC<CustomSnackbarProps> = ({
	text,
	type,
	openSnackBar,
	handleclose
	
}) => {
	return (
		<div style={{ width: "100%" }}>
			<Snackbar
				open={openSnackBar}
				autoHideDuration={1000}
				onClose={handleclose}
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
