import { makeStyles } from "@material-ui/core";
import LoadingButton from "@material-ui/lab/LoadingButton";
import React, { FC } from "react";
const useStyles = makeStyles((theme) => ({
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

interface FormButtonProps {
	text: string;
	loading: boolean;
}

const FormButton: FC<FormButtonProps> = ({ loading, text }) => {
	const classes = useStyles();
	return (
		<LoadingButton
			pending={loading}
			type="submit"
			fullWidth
			variant="contained"
			color="primary"
			className={classes.submit}
		>
			{text}
		</LoadingButton>
	);
};

export default FormButton;
