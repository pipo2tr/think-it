import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { FC } from "react";
import { MinPostType } from "../utils/MinPostType";
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
interface PostAccordianInterface{
    post: MinPostType
}
const PostAccordion: FC<PostAccordianInterface> = ({post}) => {
	const classes = useStyles();


	return (
		<Accordion className={classes.accordion} key={post.id}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>
					Posted On : {post.createdAt.split("T")[0]}
				</Typography>
				<Typography className={classes.heading}>
					Likes: {post.points}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Typography>{post.text}</Typography>
			</AccordionDetails>
		</Accordion>
	);
};

export default PostAccordion;
