import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Link from "next/link";
import React from "react";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		menuButton: {
			marginRight: theme.spacing(1),
		},
		root: {
			width: "100%",
			maxWidth: 360,
			backgroundColor: theme.palette.background.paper,
		},
		nested: {
			paddingLeft: theme.spacing(4),
		},
	})
);
export const NotAuthDesktop = () => {
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
					<LockOutlinedIcon />
				</IconButton>
			</Link>
		</div>
	);
};

export function NotAuthMobile() {
	const classes = useStyles();
	return (
		<List
			className={classes.root}
			subheader={
				<ListSubheader
					component="div"
					id="nested-list-subheader"
					color="primary"
				>
					ThinkIt!
				</ListSubheader>
			}
		>
			<Link href="/register">
				<ListItem button>
					<ListItemIcon>
						<PersonAddIcon />
					</ListItemIcon>
					<ListItemText primary="Register" />
				</ListItem>
			</Link>
			<Link href="/login">
				<ListItem button>
					<ListItemIcon>
						<LockOutlinedIcon />
					</ListItemIcon>
					<ListItemText primary="Login" />
				</ListItem>
			</Link>
		</List>
	);
}
