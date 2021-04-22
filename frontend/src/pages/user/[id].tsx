import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Layout from "../../components/Layout";
import { withApollo } from "../../utils/withApollo";
import Container from "@material-ui/core/Container";
import { Box } from "@material-ui/core";
import ProfileCard from "../../components/ProfileCard";
import { useGetUserByIdQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			marginTop: theme.spacing(8),
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		accordion: {
			width: "100%",
			[theme.breakpoints.up("sm")]: {
				width: "60%",
			},
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			fontWeight: theme.typography.fontWeightRegular,
		},
		title: {
			fontSize: theme.typography.pxToRem(20),
			fontWeight: theme.typography.fontWeightBold,
			padding: theme.spacing(1),
		},
		hero: {
			backgroundImage: "",
			height: "auto",
			width: "100%",
			flexDirection: "row",
			justifyContent: "center",
			display: "flex",
			// alignItems: "center",
			padding: "20px 0",
		},
		avtar: {
			height: "56px",
			width: "56px",
			padding: theme.spacing(3),
		},
	})
);

const userProfile = () => {
	const classes = useStyles();
	const router = useRouter();
	const Id = parseInt(router.query.id as string);
	const { data } = useGetUserByIdQuery({
		skip: !Id,
		variables: {
			id: Id,
		},
	});

	const UserCard = (
		<Box className={classes.hero}>
			{data?.getUserById.errors ? (
				<Typography className={classes.heading}>
					{data?.getUserById.errors}
				</Typography>
			) : (
				<ProfileCard minUser={data?.getUserById?.user} />
			)}
		</Box>
	);

	return (
		<Layout>
			<Container component="main" maxWidth="xl">
				<div className={classes.root}>
					{data ? (
						UserCard
					) : (
						<Typography className={classes.heading}>
							Cannot fetch user
						</Typography>
					)}
					<Accordion className={classes.accordion}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography className={classes.heading}>
								Accordion 1
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Suspendisse malesuada lacus ex,
								sit amet blandit leo lobortis eget.
							</Typography>
						</AccordionDetails>
					</Accordion>
				</div>
			</Container>
		</Layout>
	);
};

export default withApollo({ ssr: true })(userProfile);
