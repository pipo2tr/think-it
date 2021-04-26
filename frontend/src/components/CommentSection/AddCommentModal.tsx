import { gql } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import { useFormik } from "formik";
import React, { FC } from "react";
import { useAddCommentMutation } from "../../generated/graphql";
import { useModalFormStyle } from "../../hooks/useModalFormStyle";
import FormButton from "../Form/FormButton";
import FormHeader from "../Form/FormHeader";
import InputField from "../Form/InputField";
interface AddCommentProps {
    handleClose: () => void;
    postId: number
}
const AddCommentModal: FC<AddCommentProps> = ({ handleClose, postId }) => {
    const [addComment, {loading}] = useAddCommentMutation()
	const classes = useModalFormStyle();
	const formik = useFormik({
		initialValues: {
			text: "",
		},
		onSubmit: async (values) => {
			const res = await addComment({
                variables: {
                    id: postId,
                    text: values.text
                },
                update: (cache) => {
                    cache.evict({ fieldName: "commentsOnPost" });
                    const data = cache.readFragment<{
                        id: number;
                        numComments: number;
                    }>({
                        id: "Post:" + postId,
                        fragment: gql`
                            fragment readPost on Post {
                                id
                                numComments
                            }
                        `,
                    });
                    if (data) {
                        cache.writeFragment({
                            id: "Post:" + postId,
                            fragment: gql`
                                fragment writePost on Post {
                                    numComments
                                }
                            `,
                            data: {
                                numComments: data.numComments + 1
                            },
                        });
                    }
                    
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
				<FormButton loading={loading} text="Comment" />
			</form>
		</div>
	);
};

export default AddCommentModal;
