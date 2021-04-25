import React, { FC } from "react";

interface TabContainerProps {
	index: any;
	value: any;
}

const TabContainer : FC<TabContainerProps> = ({ children, value, index}) => {
	return (
		<div
			role="tabcontainer"
			hidden={value !== index}
			id={index === 0 ? "posts" + index : "comments" + index}
			aria-labelledby={index === 0 ? "posts" + index : "comments" + index}
		>
			{value === index && (
				<>
					{children}
				</>
			)}
		</div>
	);
}

export default TabContainer;