import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import FormButton from "../components/Form/FormButton";
import FormHeader from "../components/Form/FormHeader";
import InputField from "../components/Form/InputField";
import Layout from "../components/Layout/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { useFormStyles } from "../hooks/useFormStyle";
import { useIsAuth } from "../hooks/useisAuth";
import { withApollo } from "../utils/withApollo";

const createPost = () => {
	useIsAuth();
	const [createPost, { loading }] = useCreatePostMutation();
	const router = useRouter();
	const classes = useFormStyles();
	const formik = useFormik({
		initialValues: {
			text: "",
		},
		onSubmit: async (values) => {
			const res = await createPost({
				variables: values,
				update: (cache) => {
					cache.evict({ fieldName: "posts" });
				},
			});
			if (!res.errors) {
				router.push("/");
			}
		},
	});
	return (
		<Layout layoutWidth="xs">
			<div className={classes.paper}>
				<FormHeader text="Share your thoughts!">
				<CreateIcon />
				</FormHeader>
				<form className={classes.form} onSubmit={formik.handleSubmit}>
					<InputField
						fieldType="text"
						label="Content"
						multiline
						rows={4}
						autoFocus
						value={formik.values.text}
						onChange={formik.handleChange}
						error={
							formik.touched.text && Boolean(formik.errors.text)
						}
						helperText={formik.touched.text && formik.errors.text}
					/>
					<FormButton
						loading={loading}
						text="Post"
					/>
				</form>
			</div>
		</Layout>
	);
};

export default withApollo({ ssr: false })(createPost);
