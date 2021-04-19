// import { Icon } from "@material-ui/core";
// import AppBar from "@material-ui/core/AppBar";
// import IconButton from "@material-ui/core/IconButton";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import React, { useEffect, useState } from "react";
// import ThinkIt from "../icons/ThinkIt";
// import PersonAddIcon from "@material-ui/icons/PersonAdd";
// import NotAuth from "./NotAuth";
// import HasAuth from "./HasAuth";
// const useStyles = makeStyles((theme: Theme) =>
// 	createStyles({
// 		root: {
// 			flexGrow: 1,
// 		},
// 		menuButton: {
// 			marginRight: theme.spacing(2),
// 		},
// 		title: {
// 			flexGrow: 1,
// 		},
// 	})
// );

// export default function NavBar() {
// 	const classes = useStyles();
// 	const [auth, setAuth] = useState(true);
// 	useEffect(() => {
// 		setAuth(false);
// 	}, []);
// 	return (
// 		<div className={classes.root}>
// 			<AppBar position="fixed" color="primary">
// 				<Toolbar>
// 					<IconButton
// 						edge="start"
// 						className={classes.menuButton}
// 						color="inherit"
// 						aria-label="menu"
// 					>
// 						<ThinkIt />
// 					</IconButton>
// 					<Typography variant="h6" className={classes.title}>
// 						ThinkIt!
// 					</Typography>
// 					{auth ? <HasAuth /> : <NotAuth />}
// 				</Toolbar>
// 			</AppBar>
// 			<Toolbar />
// 		</div>
// 	);
// }
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { useMeQuery } from "../generated/graphql";
import ThinkIt from "../icons/ThinkIt";
import { HasAuthDesktop, HasAuthMobile } from "./HasAuth";
import { NotAuthDesktop, NotAuthMobile } from "./NotAuth";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		grow: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			display: "none",
			[theme.breakpoints.up("sm")]: {
				display: "block",
			},
		},
		sectionDesktop: {
			display: "none",
			[theme.breakpoints.up("md")]: {
				display: "flex",
			},
		},
		sectionMobile: {
			display: "flex",
			[theme.breakpoints.up("md")]: {
				display: "none",
			},
		},
		list: {
			width: "240px",
		},
	})
);

export default function NavBar() {
	const classes = useStyles();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { data, error } = useMeQuery();

	const handleMobileMenuClose = () => {
		setDrawerOpen(false);
	};

	const handleMobileMenuOpen = () => {
		setDrawerOpen(true);
	};
	console.log(data?.me?.username);
	console.log(error);
	
	const mobileMenuId = "primary-account-logout-createpost-mobile";
	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer"
					>
						<ThinkIt />
					</IconButton>
					<Typography className={classes.title} variant="h6" noWrap>
						ThinkIt!
					</Typography>

					<div className={classes.grow} />

					<div className={classes.sectionDesktop}>
						{data?.me?.username ? (
							<HasAuthDesktop />
						) : (
							<NotAuthDesktop />
						)}
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<div>
				<Drawer
					anchor="right"
					open={drawerOpen}
					onClose={handleMobileMenuClose}
				>
					<div className={classes.list}>
						{data?.me?.username ? (
							<HasAuthMobile />
						) : (
							<NotAuthMobile />
						)}
					</div>
				</Drawer>
			</div>
		</div>
	);
}
