import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FormButton from "../../components/Form/FormButton";
import FormGrid from "../../components/Form/FormGrid";
import FormHeader from "../../components/Form/FormHeader";
import InputField from "../../components/Form/InputField";
import Layout from "../../components/Layout/Layout";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useFormStyles } from "../../hooks/useFormStyle";
import { mapError } from "../../utils/mapError";
import { withApollo } from "../../utils/withApollo";

const changePassword = () => {
	const router = useRouter();
	const [changePwd, { loading }] = useChangePasswordMutation();
	const [tokenError, setTokenError] = useState("");
	const classes = useFormStyles();
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
			if (res?.data?.changePassword.errors) {
				const err = mapError(res?.data?.changePassword?.errors);
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
				<FormHeader text="Change Password">
					<VpnKeyIcon />
				</FormHeader>
				<form className={classes.form} onSubmit={formik.handleSubmit}>
					<InputField
						fieldType="password"
						autoFocus
						label="New Password"
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
						<FormGrid
							text1={tokenError}
							error={true}
							link1="/forgot-password"
							link2="/forgot-password"
							text2="Get a new token"
						/>
					) : null}
					<FormButton loading={loading} text="Change Password" />
				</form>
			</div>
		</Layout>
	);
};
export default withApollo({ ssr: false })(changePassword);
