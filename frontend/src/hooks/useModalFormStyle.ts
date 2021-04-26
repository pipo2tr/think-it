import { makeStyles } from "@material-ui/core/styles";

export const useModalFormStyle = makeStyles((theme) => ({
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "90%",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
}));