import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import { useFormik } from "formik";
import React, { FC } from "react";
import { useCreatePostMutation } from "../../generated/graphql";
import { useModalFormStyle } from "../../hooks/useModalFormStyle";
import FormButton from "../Form/FormButton";
import FormHeader from "../Form/FormHeader";
import InputField from "../Form/InputField";

interface CreatePostProps {
	handleClose: () => void;
}
const CreatePost: FC<CreatePostProps> = ({ handleClose }) => {
	const [createPost, { loading }] = useCreatePostMutation();
	const classes = useModalFormStyle();
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
				handleClose();
			}
		},
	});
	return (
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
					error={formik.touched.text && Boolean(formik.errors.text)}
					helperText={formik.touched.text && formik.errors.text}
				/>
				<FormButton loading={loading} text="Post" />
			</form>
		</div>
	);
};

export default CreatePost;
