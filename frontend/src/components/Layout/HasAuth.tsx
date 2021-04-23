import { useApolloClient } from "@apollo/client";
import { Avatar, createStyles, makeStyles, Theme } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { red } from "@material-ui/core/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import CreateIcon from "@material-ui/icons/Create";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExploreIcon from "@material-ui/icons/Explore";
import Link from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		menuButton: {
			marginRight: theme.spacing(1),
		},
		root: {
			width: "100%",
			minWidth: 240,
			backgroundColor: theme.palette.background.paper,
			[theme.breakpoints.up("md")]: {
				boxShadow: "2px 2px 2px #888888",
			},
			
		},
		nested: {
			paddingLeft: theme.spacing(4),
		},
		avatar: {
			backgroundColor: red[500],
			width: "32px",
			height: "32px",
		},
	})
);

export function HasAuthMobile() {
	const apollo = useApolloClient();
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);
	const { data } = useMeQuery();
	const [logout] = useLogoutMutation();
	const handleLogout = async () => {
		await logout();
		await apollo.resetStore();
	};

	const handleClick = () => {
		setOpen(!open);
	};

	if (!data?.me?.username) {
		return null;
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
			<Link href="/create-post">
				<ListItem button>
					<ListItemIcon>
						<CreateIcon />
					</ListItemIcon>
					<ListItemText primary="Create Post" />
				</ListItem>
			</Link>
			<ListItem button>
				<ListItemIcon>
					<ExploreIcon />
				</ListItemIcon>
				<ListItemText primary="Explore" />
			</ListItem>
			<ListItem button onClick={handleClick}>
				<ListItemIcon>
					<Avatar aria-label="user" className={classes.avatar}>
						{data?.me?.username[0]}
					</Avatar>
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
					<ListItem
						button
						className={classes.nested}
						onClick={handleLogout}
					>
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
