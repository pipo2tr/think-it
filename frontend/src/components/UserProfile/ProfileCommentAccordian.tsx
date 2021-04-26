import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Link from "next/link";
import React, { FC } from "react";
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
		flex: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
		},
	})
);
interface ProfileCommentAccordianProps {
	comment: minCommentType;
}
const ProfileCommentAccordion: FC<ProfileCommentAccordianProps> = ({
	comment,
}) => {
	const classes = useStyles();

	return (
		<Accordion
			className={classes.accordion}
			key={comment.id}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography>{comment.text}</Typography>
			</AccordionSummary>
			<AccordionDetails className={classes.flex}>
				<Link href="/posts/[id]" as={`/posts/${comment.postId}`}>
					<Typography
						className={classes.heading}
						style={{ color: "blueviolet" }}
					>
						View Post
					</Typography>
				</Link>
				<Typography className={classes.heading}>
					Posted On : {comment.createdAt.split("T")[0]}
				</Typography>
			</AccordionDetails>
		</Accordion>
	);
};

export default ProfileCommentAccordion;
