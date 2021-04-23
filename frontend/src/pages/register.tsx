import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { mapError } from "../utils/mapError";
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

const register = () => {
	const [register, { loading }] = useRegisterMutation();
	const router = useRouter()
	const classes = useStyles();
	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
		},
		onSubmit: async (values, { setErrors }) => {
			const res = await register({
				variables: { input: values },
				update: (cache, {data}) => {
					cache.writeQuery<MeQuery>({
						query: MeDocument,
						data: {
							__typename: "Query",
							me: data?.register.user
						}
					})
				},
			});
			if (res.data.register.errors) {
				console.log(mapError(res.data.register.errors));
				setErrors(mapError(res.data.register.errors));
			} else if (res.data.register.user) {
				router.push("/")
			}
		},
	});
	return (
		<Layout layoutWidth = "xs">
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<PersonAddIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Register
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
							id="username"
							label="User Name"
							name="username"
							autoComplete="username"
							autoFocus
							value={formik.values.username}
							onChange={formik.handleChange}
							error={
								formik.touched.username &&
								Boolean(formik.errors.username)
							}
							helperText={
								formik.touched.username &&
								formik.errors.username
							}
						/>
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
							Register
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
								<Link href="/login">
									<Typography
										component="p"
										variant="subtitle2"
										className={classes.link}
									>
										Already have an account? Sign in
									</Typography>
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
		</Layout>
	);
}

export default withApollo({ssr: false})(register)