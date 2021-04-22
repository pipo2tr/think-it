import React, { FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import StarsIcon from "@material-ui/icons/Stars";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { MinUserType } from "../utils/MinUserTyoe";
import BlockIcon from "@material-ui/icons/Block";
import ShareIcon from "@material-ui/icons/Share";
import { useMeQuery } from "../generated/graphql";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import HealingIcon from '@material-ui/icons/Healing';

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
	minUser: MinUserType;
}

const ProfileCard: FC<ProfileCardType> = ({ minUser }) => {
	const classes = useStyles();
	const { data } = useMeQuery();

	const ModSection = (
		<div className={classes.controls}>
			{minUser.role === 0 ? (
				<IconButton aria-label="unban">
					<HealingIcon style={{ color: "green" }} />
				</IconButton>
			) : (
				<IconButton aria-label="ban">
					<RemoveCircleIcon style={{ color: "red" }} />
				</IconButton>
			)}
			{data?.me?.role === 3 ? (
				<IconButton aria-label="delete user">
					<DeleteIcon style={{ color: "red" }} />
				</IconButton>
			) : null}
		</div>
	);

	console.log(data?.me?.role >= 3);

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
						{minUser.username}
						{minUser.role >= 2 ? <StarsIcon style={{ color: "gold" }} /> : null}
					</Typography>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
					>
						Creation Date : {minUser.createdAt.split("T")[0]}
					</Typography>
				</CardContent>
			</CardActionArea>
			<div className={classes.actionSection}>
				<div className={classes.controls}>
					<IconButton aria-label="follow">
						<PersonAddIcon className={classes.follow} />
					</IconButton>
					<IconButton aria-label="block">
						<BlockIcon color="error" />
					</IconButton>
					<IconButton aria-label="share-profile">
						<ShareIcon style={{ color: "blue" }} />
					</IconButton>
				</div>
				{minUser.role !== 3 && data?.me?.role >= 2 ? ModSection : null}
			</div>
		</Card>
	);
};

export default ProfileCard;
