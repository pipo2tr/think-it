import {
    Avatar,
    makeStyles,
    Typography
} from "@material-ui/core";
import React, { FC } from "react";
const useStyles = makeStyles((theme) => ({
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
}));

type FormHeaderProps = {
	text: string;
};

const FormHeader: FC<FormHeaderProps> = ({ text, children }) => {
	const classes = useStyles();
	return (
		<>
			<Avatar className={classes.avatar}>{children}</Avatar>
			<Typography component="h1" variant="h5">
				{text}
			</Typography>
		</>
	);
};

export default FormHeader;
