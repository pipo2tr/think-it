import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import ThinkIt from "../../icons/ThinkIt";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: "#fff",
		},
		logo: {
			width: 36,
			height: 36,
		},
	})
);

const BackDrop = () => {
	const classes = useStyles();

	return (
		<div>
			<Backdrop className={classes.backdrop} open={true}>
				<ThinkIt height={32} width={32} />
			</Backdrop>
		</div>
	);
};

export default BackDrop;
