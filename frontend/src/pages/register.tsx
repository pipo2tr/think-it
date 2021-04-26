import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import FormButton from "../components/Form/FormButton";
import FormGrid from "../components/Form/FormGrid";
import FormHeader from "../components/Form/FormHeader";
import InputField from "../components/Form/InputField";
import Layout from "../components/Layout/Layout";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { useFormStyles } from "../hooks/useFormStyle";
import { mapError } from "../utils/mapError";
import { withApollo } from "../utils/withApollo";


const register = () => {
	const [register, { loading }] = useRegisterMutation();
	const router = useRouter();
	const classes = useFormStyles();
	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
		},
		onSubmit: async (values, { setErrors }) => {
			const res = await register({
				variables: { input: values },
				update: (cache, { data }) => {
					cache.evict({ fieldName: "posts" });
					cache.writeQuery<MeQuery>({
						query: MeDocument,
						data: {
							__typename: "Query",
							me: data?.register.user,
						},
					});
				},
			});
			if (res?.data?.register.errors) {
				setErrors(mapError(res.data.register.errors));
			} else if (res?.data?.register.user) {
				router.push("/");
			}
		},
	});
	return (
		<Layout layoutWidth="xs">
			<div className={classes.paper}>
				<FormHeader text="Register">
					<PersonAddIcon/>
				</FormHeader>
				<form className={classes.form} onSubmit={formik.handleSubmit}>
					<InputField
						fieldType="username"
						label="User Name"
						autoFocus
						value={formik.values.username}
						onChange={formik.handleChange}
						error={
							formik.touched.username &&
							Boolean(formik.errors.username)
						}
						helperText={
							formik.touched.username && formik.errors.username
						}
					/>
					<InputField
						fieldType="email"
						label="Email Address"
						value={formik.values.email}
						onChange={formik.handleChange}
						error={
							formik.touched.email && Boolean(formik.errors.email)
						}
						helperText={formik.touched.email && formik.errors.email}
					/>
					<InputField
						fieldType="password"
						label="Password"
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
					<FormButton text="Register" loading={loading} />
					<FormGrid
						link1="/forgot-password"
						text1="Forgot Password"
						link2="/login"
						text2="Already have an account? Login"
					/>
				</form>
			</div>
		</Layout>
	);
};

export default withApollo({ ssr: false })(register);
