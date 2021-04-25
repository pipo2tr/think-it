import IconButton from "@material-ui/core/IconButton";
import React, { FC } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useVotingMutation } from "../../generated/graphql";
import { gql } from "@apollo/client";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { formatNumber } from "../../utils/formatNumber";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		like: {
			fontSize: 16,
		},
		counter: {
			padding: 5,
		},
		bigIcon: {
			width: 24,
			height: 24,
		},
	})
);

interface VotingSectionProps {
	voteStatus: boolean | null;
	id: number;
	points: number;
}

const VotingSection: FC<VotingSectionProps> = ({ voteStatus, id, points }) => {
	const classes = useStyles();
	const [vote] = useVotingMutation();

	const handleVoting = async (postId: number) => {
		const res = await vote({
			variables: {
				postId,
			},
			update: (cache) => {
				const data = cache.readFragment<{
					id: number;
					points: number;
					voteStatus: number | null;
				}>({
					id: "Post:" + postId,
					fragment: gql`
						fragment _ on Post {
							id
							points
							voteStatus
						}
					`,
				});
				if (data) {
					cache.writeFragment({
						id: "Post:" + postId,
						fragment: gql`
							fragment __ on Post {
								points
								voteStatus
							}
						`,
						data: {
							points: data.voteStatus
								? data.points - 1
								: data.points + 1,
							voteStatus: data.voteStatus ? null : true,
						},
					});
				}
			},
		});
	};
	return (
		<IconButton
			aria-label="like"
			onClick={() => handleVoting(id)}
			className={classes.like}
		>
			<FavoriteIcon
				color={voteStatus ? "secondary" : "inherit"}
				className={classes.bigIcon}
			/>
			<span
				className={classes.counter}
				style={{ color: voteStatus ? "#f50057" : "inherit" }}
			>
				{/* {formatNumber(points)} */}
				{points}
			</span>
		</IconButton>
	);
};

export default VotingSection;
