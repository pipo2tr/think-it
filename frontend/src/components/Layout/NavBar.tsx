import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { useMeQuery } from "../../generated/graphql";
import ThinkIt from "../../icons/ThinkIt";
import { HasAuthMobile } from "./HasAuth";
import { NotAuthDesktop, NotAuthMobile } from "./NotAuth";
import Link from "next/link";
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
			cursor: "pointer",
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
	const { data } = useMeQuery();

	const handleMobileMenuClose = () => {
		setDrawerOpen(false);
	};

	const handleMobileMenuOpen = () => {
		setDrawerOpen(true);
	};
	const mobileMenuId = "primary-account-logout-createpost-mobile";
	return (
		<div className={classes.grow}>
			<AppBar position="fixed">
				<Toolbar>
					<Link href="/">
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="open drawer"
						>
							<ThinkIt />
						</IconButton>
					</Link>
					<Link href="/">
						<Typography
							className={classes.title}
							variant="h6"
							noWrap
						>
							ThinkIt!
						</Typography>
					</Link>
					<div className={classes.grow} />

					<div className={classes.sectionDesktop}>
						{data?.me?.username ? null : <NotAuthDesktop />}
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
							<HasAuthMobile
								handleMobileMenuClose={handleMobileMenuClose}
							meData={data.me!}
							/>
						) : (
							<NotAuthMobile />
						)}
					</div>
				</Drawer>
			</div>
		</div>
	);
}
