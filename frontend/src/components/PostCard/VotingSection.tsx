import IconButton from "@material-ui/core/IconButton";
import React, { FC } from "react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useVotingMutation } from "../../generated/graphql";
import { gql } from "@apollo/client";

interface VotingSectionProps {
	voteStatus: boolean | null;
	id: number;
}

const VotingSection: FC<VotingSectionProps> = ({ voteStatus, id }) => {
	const [vote] = useVotingMutation();

	const handleVoting = async (postId) => {
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
		<IconButton aria-label="like" onClick={() => handleVoting(id)}>
			<FavoriteIcon color={voteStatus ? "secondary" : "inherit"} />
		</IconButton>
	);
};

export default VotingSection;
