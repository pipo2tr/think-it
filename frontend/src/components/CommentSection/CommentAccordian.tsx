import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { FC } from "react";
import { CommentType } from "../../utils/CommentType";
import { minCommentType } from "../../utils/minCommentType";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		accordion: {
			width: "100%",
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			fontWeight: theme.typography.fontWeightRegular,
		},
		
	})
);
interface CommentAccordianProps{
    comment: CommentType
}
const CommentAccordion: FC<CommentAccordianProps> = ({comment}) => {
	const classes = useStyles();

	return (
		<Accordion className={classes.accordion} key={comment.id}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>
					By: {comment.user.username}
				</Typography>
				<Typography className={classes.heading}>
					Posted On : {comment.createdAt.split("T")[0]}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Typography>{comment.text}</Typography>
			</AccordionDetails>
		</Accordion>
	);
};

export default CommentAccordion;
