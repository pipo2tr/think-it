import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import FormButton from "../components/Form/FormButton";
import FormGrid from "../components/Form/FormGrid";
import FormHeader from "../components/Form/FormHeader";
import InputField from "../components/Form/InputField";
import Layout from "../components/Layout/Layout";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { useFormStyles } from "../hooks/useFormStyle";
import { mapError } from "../utils/mapError";
import { withApollo } from "../utils/withApollo";

const login = () => {
	const [login, { loading }] = useLoginMutation();
	const router = useRouter();
	const classes = useFormStyles();
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
					cache.evict({ fieldName: "posts" });
					cache.writeQuery<MeQuery>({
						query: MeDocument,
						data: {
							__typename: "Query",
							me: data?.login.user,
						},
					});
				},
			});
			if (res?.data?.login.errors) {
				setErrors(mapError(res.data.login.errors));
			} else if (res?.data?.login.user) {
				if (typeof router.query.next === "string") {
					router.push(router.query.next);
				} else {
					router.push("/");
				}
			}
		},
	});
	return (
		<Layout layoutWidth="xs">
			<div className={classes.paper}>
				<FormHeader text="Sign In">
					<LockOutlinedIcon />
				</FormHeader>
				<form className={classes.form} onSubmit={formik.handleSubmit}>
					<InputField
						label="Username Or Email"
						fieldType="usernameOremail"
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
					<InputField
						fieldType="password"
						label="Password"
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
					<FormButton text="Log in" loading={loading}/>
					<FormGrid
						link1="/forgot-password"
						text1="Forgot Password"
						link2="/register"
						text2="Dont't have an account? Register"
					/>
				</form>
			</div>
		</Layout>
	);
};
export default withApollo({ ssr: false })(login);
