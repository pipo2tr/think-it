import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import MoodIcon from "@material-ui/icons/Mood";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { useForgotPasswordMutation } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	link: {
		cursor: "pointer",
		color: theme.palette.primary.dark,
	},
}));

const forgotPassword = () => {
	const [forgotPwd, { loading }] = useForgotPasswordMutation();
	const [sentMail, setSentMail] = useState(false);
	const classes = useStyles();
	const formik = useFormik({
		initialValues: {
			email: "",
		},
		onSubmit: async (values) => {
			await forgotPwd({
				variables: values,
			});
			setSentMail(true);
		},
	});
	return (
		<Layout>
			{sentMail ? (
				<Container component="main" maxWidth="lg">
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<MoodIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Succefullty sent mail to {formik.values.email},
							please check your inbox
						</Typography>
					</div>
				</Container>
			) : (
				<Container component="main" maxWidth="xs">
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<MoodBadIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Forgot Password
						</Typography>
						<form
							className={classes.form}
							onSubmit={formik.handleSubmit}
						>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
								value={formik.values.email}
								onChange={formik.handleChange}
								error={
									formik.touched.email &&
									Boolean(formik.errors.email)
								}
								helperText={
									formik.touched.email && formik.errors.email
								}
							/>
							<LoadingButton
								pending={loading}
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
							>
								Submit
							</LoadingButton>
							<Grid container>
								<Grid item xs>
									<Link href="/register">
										<Typography
											component="p"
											variant="subtitle2"
											className={classes.link}
										>
											Don't have an account?
										</Typography>
									</Link>
								</Grid>
								<Grid item>
									<Link href="/login">
										<Typography
											component="p"
											variant="subtitle2"
											className={classes.link}
										>
											I remember my password!
										</Typography>
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</Container>
			)}
		</Layout>
	);
}

export default withApollo({ssr:false})(forgotPassword)