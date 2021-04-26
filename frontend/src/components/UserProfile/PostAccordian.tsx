import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Hidden from "@material-ui/core/Hidden";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Link from "next/link";
import React, { FC } from "react";
import { MinPostType } from "../../utils/MinPostType";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		accordion: {
			width: "100%",
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			fontWeight: theme.typography.fontWeightRegular,
		},
		flex: {
			display:"flex",
			justifyContent: "space-between",
			alignItems:"center"
		},
	})
);
interface PostAccordianInterface {
	post: MinPostType;
}
const PostAccordion: FC<PostAccordianInterface> = ({ post }) => {
	const classes = useStyles();

	return (
		<Accordion className={classes.accordion} key={post.id}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
			<Link href="/posts/[id]" as={`/posts/${post.id}`}>
				<Typography className={classes.heading}>{post.text}</Typography>
			</Link>
			</AccordionSummary>
				<AccordionDetails className={classes.flex}>
					<Hidden xsDown>
						<Typography className={classes.heading}>
							Posted On : {post.createdAt.split("T")[0]}
						</Typography>
					</Hidden>
					<Typography className={classes.heading}>
						Comments: {post.numComments}
					</Typography>
					<Typography className={classes.heading}>
						Likes: {post.points}
					</Typography>
				</AccordionDetails>
		</Accordion>
	);
};

export default PostAccordion;
