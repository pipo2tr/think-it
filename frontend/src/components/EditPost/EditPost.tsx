import { gql } from "@apollo/client";
import CreateIcon from "@material-ui/icons/Create";
import { useFormik } from "formik";
import React, { FC } from "react";
import { PostFragFragment, useUpdatePostMutation } from "../../generated/graphql";
import { useModalFormStyle } from "../../hooks/useModalFormStyle";
import FormButton from "../Form/FormButton";
import FormHeader from "../Form/FormHeader";
import InputField from "../Form/InputField";

interface EditPostProps {
	post: PostFragFragment;
	handleClose: () => void;
}

const EditPost: FC<EditPostProps> = ({ post, handleClose }) => {
	const [update, { loading }] = useUpdatePostMutation();
	const classes = useModalFormStyle();

	const formik = useFormik({
		initialValues: {
			text: post.text,
		},
		onSubmit: async (values) => {
			const res = await update({
				variables: {
					id: post.id,
					text: values.text,
				},
				update: (cache) => {
					cache.writeFragment({
						id: "Post:" + post.id,
						fragment: gql`
							fragment ___ on Post {
								text
							}
						`,
						data: { text: values.text },
					});
				},
			});
			handleClose();
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
				<FormButton loading={loading} text="Edit" />
			</form>
		</div>
	);
};

export default EditPost;
