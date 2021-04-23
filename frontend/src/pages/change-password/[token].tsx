import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";
import { useChangePasswordMutation } from "../../generated/graphql";
import { mapError } from "../../utils/mapError";

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

export default function changePassword() {
	const router = useRouter();
	const [changePwd, { loading }] = useChangePasswordMutation();
	const [tokenError, setTokenError] = useState("");
	const classes = useStyles();
	const formik = useFormik({
		initialValues: {
			password: "",
		},
		onSubmit: async (values, { setErrors }) => {
			const res = await changePwd({
				variables: {
					newPassword: values.password,
					token: router.query.token as string,
				},
			});
			if (res.data.changePassword.errors) {
				const err = mapError(res.data.changePassword.errors);
				if ("token" in err) {
					setTokenError(err.token);
				}
				setErrors(err);
			} else {
				router.push("/login");
			}
		},
	});
	return (
		<Layout layoutWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<VpnKeyIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Change Password
				</Typography>
				<form className={classes.form} onSubmit={formik.handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						autoFocus
						name="password"
						label="New Password"
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
					{tokenError ? (
						<Grid container>
							<Grid item xs>
								<Typography
									component="p"
									variant="subtitle2"
									color="error"
								>
									{tokenError}
								</Typography>
							</Grid>
							<Grid item>
								<Link href="/forgot-password">
									<Typography
										component="p"
										variant="subtitle2"
										className={classes.link}
									>
										Get a new token
									</Typography>
								</Link>
							</Grid>
						</Grid>
					) : null}
					<LoadingButton
						pending={false}
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Change
					</LoadingButton>
				</form>
			</div>
		</Layout>
	);
}
