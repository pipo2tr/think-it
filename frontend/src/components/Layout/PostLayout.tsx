import { useMediaQuery } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC } from "react";
import { HasAuthMobile } from "./HasAuth";
import Layout from "./Layout";
import { useMeQuery } from "../../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			marginTop: theme.spacing(8),
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			width: "100%",
		},

		grid1: {
			minWidth: "360px",
		},
		grid2: {
			display: "none",
			[theme.breakpoints.up("md")]: {
				display: "block",
			},
		},
		ig: {
			position: "sticky",
			top: theme.spacing(9),
		},
	})
);

const PostLayout: FC = ({ children }) => {
	const classes = useStyles();
	const { data } = useMeQuery();
	const mq = useMediaQuery('(max-width:600px)')
	
	
	return (
		<Layout layoutWidth={mq ? "xl" : "md"}>
				<Grid container spacing={mq ? 0 : 3} className={classes.paper}>
					<Grid item xs={9} className={classes.grid1}>
						{children}
					</Grid>
					{data?.me ? (
						<Grid item xs={3} className={classes.grid2}>
							<Paper className={classes.ig}>
								<HasAuthMobile/>
							</Paper>
						</Grid>
					) : null}
				</Grid>
		</Layout>
	);
};
export default PostLayout;
