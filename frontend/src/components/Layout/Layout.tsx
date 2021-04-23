import Container from "@material-ui/core/Container";
import React from "react";
import NavBar from "./NavBar";

interface LayoutProp {
	layoutWidth: "lg" | "md" | "sm" | "xs" | "xl";
}

const Layout: React.FC<LayoutProp> = ({layoutWidth ,children }) => {
	return (
		<>
			<NavBar />
			<Container component="main" maxWidth={layoutWidth}>
				{children}
			</Container>
		</>
	);
};

export default Layout;
