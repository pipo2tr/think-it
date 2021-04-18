import classes from "*.module.css";
import {
	Toolbar,
	IconButton,
	Typography,
	createStyles,
	makeStyles,
	Theme,
} from "@material-ui/core";
import React from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Link from "next/link";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		menuButton: {
			marginRight: theme.spacing(1),
		},
	})
);
const NotAuth = () => {
	const classes = useStyles();
	return (
		<div>
			<Link href="/register">
				<IconButton
					className={classes.menuButton}
					color="inherit"
					aria-label="register"
				>
					<PersonAddIcon />
				</IconButton>
			</Link>
			<Link href="/login">
				<IconButton
					className={classes.menuButton}
					color="inherit"
					aria-label="lohin"
				>
					<KeyboardReturnIcon />
				</IconButton>
			</Link>
		</div>
	);
};

export default NotAuth;
