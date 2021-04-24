import { gql } from "@apollo/client";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import React, { FC } from "react";
import { useUpdatePostMutation } from "../../generated/graphql";
import { PostsType } from "../../utils/PostsType";
const useStyles = makeStyles((theme) => ({
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "90%",
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
}));

interface EditPostProps {
	post: PostsType;
	handleClose: () => void;
}

const EditPost: FC<EditPostProps> = ({ post, handleClose }) => {
	const [update, { loading }] = useUpdatePostMutation();
	const classes = useStyles();

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
			<Avatar className={classes.avatar}>
				<CreateIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Edit Post!
			</Typography>
			<form className={classes.form} onSubmit={formik.handleSubmit}>
				<TextField
					variant="outlined"
					margin="normal"
					required
					rows={4}
					fullWidth
					multiline
					id="text"
					label="Content"
					name="text"
					autoComplete="text"
					autoFocus
					value={formik.values.text}
					onChange={formik.handleChange}
					error={formik.touched.text && Boolean(formik.errors.text)}
					helperText={formik.touched.text && formik.errors.text}
				/>
				<LoadingButton
					pending={loading}
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
				>
					Edit
				</LoadingButton>
			</form>
		</div>
	);
};

export default EditPost;
