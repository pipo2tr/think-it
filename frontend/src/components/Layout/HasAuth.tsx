import {
	Avatar,
	createStyles,
	makeStyles,
	Theme,
	useMediaQuery,
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { red } from "@material-ui/core/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExploreIcon from "@material-ui/icons/Explore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import {
	useDeleteMeMutation,
	useLogoutMutation,
	useMeQuery,
} from "../../generated/graphql";
import CreatePost from "../EditPost/CreatePost";
import PostModal from "../EditPost/PostModal";
import AlertDialog from "../Utils/AlertDialog";
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

interface HasAuthMobileProps {
	handleMobileMenuClose?: () => void;
}

export const HasAuthMobile: FC<HasAuthMobileProps> = ({
	handleMobileMenuClose,
}) => {
	const classes = useStyles();
	const [deleteMe] = useDeleteMeMutation();
	const [open, setOpen] = useState(false);
	const [openDailoge, setOpenDailoge] = useState(false);
	const { data } = useMeQuery();
	const [logout] = useLogoutMutation();
	const [openModal, setOpenModal] = useState(false);
	const router = useRouter();
	const handleLogout = async () => {
		await logout();
		router.reload();
	};

	const handleClick = () => {
		setOpen(!open);
	};

	const handleClickOpen = () => {
		setOpenDailoge(true);
	};
	const handleClose = () => {
		setOpenDailoge(false);
	};
	const handleCloseModal = () => {
		setOpenModal(false);
		handleMobileMenuClose?.();
	};
	const media = useMediaQuery("(max-width:600px)");
	const handleDeleteMe = async () => {
		await deleteMe();
		router.reload();
	};

	const modalOpener = () => {
		setOpenModal(true);
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
			{media ? (
				<ListItem button onClick={modalOpener}>
					<ListItemIcon>
						<CreateIcon />
					</ListItemIcon>
					<ListItemText primary="Create Post" />
				</ListItem>
			) : (
				<Link href="/create-post">
					<ListItem button>
						<ListItemIcon>
							<CreateIcon />
						</ListItemIcon>
						<ListItemText primary="Create Post" />
					</ListItem>
				</Link>
			)}
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
					<ListItem
						button
						className={classes.nested}
						onClick={handleClickOpen}
					>
						<ListItemIcon>
							<DeleteForeverRoundedIcon
								style={{ color: "red" }}
							/>
						</ListItemIcon>
						<ListItemText primary="Delete Account" />
					</ListItem>
				</List>
			</Collapse>
			<AlertDialog
				handleAction={handleDeleteMe}
				handleClose={handleClose}
				openDialog={openDailoge}
				text=" This action is irreversible and all your posts will be removed from the site. Choose carefully"
				title="Do you want to delete your account ?"
			/>
			<PostModal handleClose={handleCloseModal} openModal={openModal}>
				<CreatePost handleClose={handleCloseModal} />
			</PostModal>
		</List>
	);
};
