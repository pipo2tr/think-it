import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import React, { FC } from "react";

const useStyles = makeStyles((theme) => ({
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	link: {
		cursor: "pointer",
		color: theme.palette.primary.dark,
	},
}));

interface FormGridProps {
	link1: string;
	text1: string;
	link2: string;
    text2: string;
    error?:boolean
}
const FormGrid: FC<FormGridProps> = ({ link1, link2, text1, text2, error }) => {
    const classes= useStyles()
	return (
		<Grid container>
			<Grid item xs>
				<Link href={link1}>
					<Typography
						component="p"
						variant="subtitle2"
                        className={classes.link}
                        style={{color: error ? "red" : "#303f9f"}}
					>
						{text1}
					</Typography>
				</Link>
			</Grid>
			<Grid item>
				<Link href={link2}>
					<Typography
						component="p"
						variant="subtitle2"
						className={classes.link}
					>
						{text2}
					</Typography>
				</Link>
			</Grid>
		</Grid>
	);
};

export default FormGrid;
