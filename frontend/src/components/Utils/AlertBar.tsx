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

interface AlertBarProps {
	text: string;
	type: "success" | "error" | "info" | "warn";
}

const AlertBar: FC<AlertBarProps> = ({ text, type }) => {
	return (
		<div className={`alert ${type}`}>
			{ICONMAPPER[type]}
			<span className="text">{text}</span>
		</div>
	);
};

export default AlertBar;
