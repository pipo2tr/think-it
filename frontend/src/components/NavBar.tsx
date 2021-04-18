import { Icon } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import ThinkIt from "../icons/ThinkIt";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import NotAuth from "./NotAuth";
import HasAuth from "./HasAuth";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
	})
);

export default function NavBar() {
	const classes = useStyles();
	const [auth, setAuth] = useState(true);
	useEffect(() => {
		setAuth(false);
	}, []);
	return (
		<div className={classes.root}>
			<AppBar position="fixed" color="transparent">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<ThinkIt />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						ThinkIt!
					</Typography>
					{auth ? <HasAuth /> : <NotAuth />}
				</Toolbar>
			</AppBar>
			<Toolbar />
		</div>
	);
}
