import { Tooltip } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BlockIcon from "@material-ui/icons/Block";
import HealingIcon from "@material-ui/icons/Healing";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import ShareIcon from "@material-ui/icons/Share";
import StarsIcon from "@material-ui/icons/Stars";
import React, { FC } from "react";
import { MinUserFragment } from "../../generated/graphql";
import BanUser from "../Moderation/BanUser";
import DeleteUser from "../Moderation/DeleteUser";
import UnbanUser from "../Moderation/UnBan";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: 345,
		},
		controls: {
			display: "flex",
			alignItems: "center",
			paddingLeft: theme.spacing(1),
			paddingBottom: theme.spacing(1),
		},
		actionSection: {
			display: "flex",
			justifyContent: "space-between",
		},
		flex: {
			display: "flex",
			justifyContent: "space-between",
		},
		follow: {
			height: 38,
			width: 38,
			color: "green",
		},
	})
);

interface ProfileCardType {
	minUser: MinUserFragment;
	me?: MinUserFragment;
}

const ProfileCard: FC<ProfileCardType> = ({ minUser, me }) => {
	const classes = useStyles();

	const copyToClipBoard = (id: number) => {
		navigator.clipboard.writeText(`http://localhost:3000/user/${id}`);
	};

	const ModSection = (
		<div className={classes.controls}>
			{minUser?.role === 0 ? (
				<UnbanUser id={minUser?.id!} />
			) : (
				<BanUser id={minUser?.id!} />
			)}
			{me?.role === 3 ? <DeleteUser id={minUser?.id!} /> : null}
		</div>
	);

	const ActionSection = (
		<div className={classes.actionSection}>
			<div className={classes.controls}>
				<Tooltip title="Follow" aria-label="follow">
					<IconButton aria-label="follow">
						<PersonAddIcon className={classes.follow} />
					</IconButton>
				</Tooltip>
				<Tooltip title="Block" aria-label="block">
					<IconButton aria-label="block">
						<BlockIcon color="error" />
					</IconButton>
				</Tooltip>
				<Tooltip title="Share" aria-label="share">
					<IconButton aria-label="share-profile" onClick={()=>copyToClipBoard(minUser?.id)}>
						<ShareIcon style={{ color: "blue" }} />
					</IconButton>
				</Tooltip>
			</div>
			{minUser?.role !== 3 && me?.role! >= 2 ? ModSection : null}
		</div>
	);

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					component="img"
					alt="Profile Picture"
					height="140"
					image="/static/img/pfp.jpg"
					title="Profile Picture"
				/>
				<CardContent>
					<Typography
						gutterBottom
						variant="h5"
						component="h2"
						className={classes.flex}
					>
						{minUser?.username}
						{minUser?.role >= 2 ? (
							<StarsIcon style={{ color: "gold" }} />
						) : null}
					</Typography>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
					>
						Creation Date : {minUser?.createdAt.split("T")[0]}
					</Typography>
				</CardContent>
			</CardActionArea>
			{me?.id === minUser?.id ? null : ActionSection}
		</Card>
	);
};

export default ProfileCard;
