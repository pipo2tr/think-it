import {
	createStyles,
	IconButton,
	makeStyles,
	Menu,
	MenuItem,
	Theme,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { useState } from "react";
import Link from "next/link";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import CreateIcon from "@material-ui/icons/Create";
import ExploreIcon from "@material-ui/icons/Explore";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import { useMeQuery } from "../generated/graphql";
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

export const HasAuthDesktop = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div>
			<IconButton
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleMenu}
				color="inherit"
			>
				<AccountCircle />
			</IconButton>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>link</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
			</Menu>
		</div>
	);
};

export function HasAuthMobile() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);
	const { data } = useMeQuery();
	const handleClick = () => {
		setOpen(!open);
	};
	
	if (!data?.me?.username) {
		return null
	}
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
			<ListItem button>
				<ListItemIcon>
					<CreateIcon />
				</ListItemIcon>
				<ListItemText primary="Create Post" />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<ExploreIcon />
				</ListItemIcon>
				<ListItemText primary="Explore" />
			</ListItem>
			<ListItem button onClick={handleClick}>
				<ListItemIcon>
					<PersonIcon />
				</ListItemIcon>
				<ListItemText primary={data?.me?.username} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem button className={classes.nested}>
						<ListItemIcon>
							<AssignmentIndIcon />
						</ListItemIcon>
						<ListItemText primary="View Profile" />
					</ListItem>
					<ListItem button className={classes.nested}>
						<ListItemIcon>
							<ExitToAppIcon />
						</ListItemIcon>
						<ListItemText primary="Logout" />
					</ListItem>
				</List>
			</Collapse>
		</List>
	);
}
