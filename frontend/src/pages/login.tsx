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
import { useLoginMutation } from "../generated/graphql";
import { mapError } from "../utils/mapError";

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
}));

export default function login() {

	const [login, {loading}] = useLoginMutation()

	const classes = useStyles();
	const formik = useFormik({
		initialValues: {
			usernameOremail: "",
			password: "",
		},
        onSubmit: async (values, {setErrors}) => {
			const res = await login({
				variables: {
				input: values
				}
			})
			if (res.data.login.errors) {
				setErrors(mapError(res.data.login.errors))
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
					<form className={classes.form} onSubmit={formik.handleSubmit}>
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
								formik.touched.usernameOremail && formik.errors.usernameOremail
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
								formik.touched.password && formik.errors.password
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
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/register">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</Layout>
	);
}