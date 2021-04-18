import React from "react";
import NavBar from "./NavBar";

interface LayoutProp {}

const Layout: React.FC<LayoutProp> = ({ children }) => {
	return (
		<>
			<NavBar />
			<div className="layout-container">{children}</div>
		</>
	);
};

export default Layout;
