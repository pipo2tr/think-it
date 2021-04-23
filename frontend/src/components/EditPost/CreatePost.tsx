import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { FC } from "react";
import Layout from "../Layout/Layout";
import { useCreatePostMutation } from "../../generated/graphql";
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
interface CreatePostProps {
	handleClose: () => void;
}
const CreatePost: FC<CreatePostProps> = ({ handleClose }) => {
	const [createPost, { loading }] = useCreatePostMutation();
	const classes = useStyles();
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
			<Avatar className={classes.avatar}>
				<CreateIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Share your thoughts!
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
					Post
				</LoadingButton>
			</form>
		</div>
	);
};

export default CreatePost;
