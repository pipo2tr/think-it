import IconButton from "@material-ui/core/IconButton";
import React, { FC, useState } from "react";
import CommentIcon from "@material-ui/icons/Comment";
import { useAddCommentMutation, useVotingMutation } from "../../generated/graphql";
import { gql } from "@apollo/client";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import PostModal from "../EditPost/PostModal";

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
			color: "green"
		},
	})
);

interface CommentButtonProps {
	points: number;
	handleOpen: () => void
}

const CommentButton: FC<CommentButtonProps> = ({ points, handleOpen }) => {
	const classes = useStyles();

	return (<>
		<IconButton
			aria-label="like"
			className={classes.like}
			onClick = {handleOpen}
		>
			<CommentIcon
				className={classes.bigIcon}
			/>
			<span
				className={classes.counter}
				style={{ color:"green" }}
			>
				
				{points}
			</span>
		
		</IconButton>
		</>
	);
};

export default CommentButton;
