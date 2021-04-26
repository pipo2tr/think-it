import MoodIcon from "@material-ui/icons/Mood";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import { useFormik } from "formik";
import React, { useState } from "react";
import FormButton from "../components/Form/FormButton";
import FormGrid from "../components/Form/FormGrid";
import FormHeader from "../components/Form/FormHeader";
import InputField from "../components/Form/InputField";
import Layout from "../components/Layout/Layout";
import { useForgotPasswordMutation } from "../generated/graphql";
import { useFormStyles } from "../hooks/useFormStyle";
import { withApollo } from "../utils/withApollo";

const forgotPassword = () => {
	const [forgotPwd, { loading }] = useForgotPasswordMutation();
	const [sentMail, setSentMail] = useState(false);
	const classes = useFormStyles();
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
		<Layout layoutWidth={sentMail ? "lg" : "xs"}>
			{sentMail ? (
				<div className={classes.paper}>
					<FormHeader
						text={`Succefullty sent mail to ${formik.values.email}, please
				check your inbox`}
					>
						<MoodIcon />
					</FormHeader>
				</div>
			) : (
				<div className={classes.paper}>
					<FormHeader text="Forgot Password">
						<MoodBadIcon />
					</FormHeader>
					<form
						className={classes.form}
						onSubmit={formik.handleSubmit}
					>
						<InputField
							fieldType="email"
							label="Email Address"
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
						<FormButton loading={loading} text="Submit" />
						<FormGrid
							link1="/register"
							text1="Don't have an account?"
							link2="/login"
							text2="I remember my password!"
						/>
					</form>
				</div>
			)}
		</Layout>
	);
};

export default withApollo({ ssr: false })(forgotPassword);
