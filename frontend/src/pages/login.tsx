import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { mapError } from "../utils/mapError";
import { useRouter } from "next/router";
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

const login =() =>{
	const [login, { loading }] = useLoginMutation();
	const router = useRouter();
	const classes = useStyles();
	const formik = useFormik({
		initialValues: {
			usernameOremail: "",
			password: "",
		},
		onSubmit: async (values, { setErrors }) => {
			const res = await login({
				variables: {
					input: values,
				},
				update: (cache, { data }) => {
					cache.writeQuery<MeQuery>({
						query: MeDocument,
						data: {
							__typename: "Query",
							me: data?.login.user,
						},
					});
				},
			});
			if (res.data.login.errors) {
				setErrors(mapError(res.data.login.errors));
			} else if (res.data.login.user) {
				router.push("/");
			}
		},
	});
	return (
		<Layout>
			<Container component="main" maxWidth="xs">
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
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
							id="usernameOremail"
							label="Username Or Email"
							name="usernameOremail"
							autoComplete="usernameOremail"
							autoFocus
							value={formik.values.usernameOremail}
							onChange={formik.handleChange}
							error={
								formik.touched.usernameOremail &&
								Boolean(formik.errors.usernameOremail)
							}
							helperText={
								formik.touched.usernameOremail &&
								formik.errors.usernameOremail
							}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={formik.values.password}
							onChange={formik.handleChange}
							error={
								formik.touched.password &&
								Boolean(formik.errors.password)
							}
							helperText={
								formik.touched.password &&
								formik.errors.password
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
							Login
						</LoadingButton>
						<Grid container>
							<Grid item xs>
								<Link href="/forgot-password">
									<Typography
										component="p"
										variant="subtitle2"
										className={classes.link}
									>
										Forgot password?
									</Typography>
								</Link>
							</Grid>
							<Grid item>
								<Link href="/register">
									<Typography
										component="p"
										variant="subtitle2"
										className={classes.link}
									>
										Don't have an account? Sign Up
									</Typography>
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</Layout>
	);
}
export default withApollo({ssr: false})(login)