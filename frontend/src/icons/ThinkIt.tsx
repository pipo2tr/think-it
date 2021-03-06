import React, { FC } from "react";

interface ThinkItProps {
	height?: number;
	width?: number;
}

const ThinkIt: FC<ThinkItProps> = ({ height = 16, width = 16 }) => {
	return (
		<svg
			width={width + ""}
			height={height + ""}
			viewBox="0 0 30 27"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M21.5508 5.67773H13.7109V27H8.4375V5.67773H0.703125V1.40625H21.5508V5.67773ZM29.6016 27H24.5039V7.98047H29.6016V27ZM24.2051 3.05859C24.2051 2.29688 24.457 1.66992 24.9609 1.17773C25.4766 0.685547 26.1738 0.439453 27.0527 0.439453C27.9199 0.439453 28.6113 0.685547 29.127 1.17773C29.6426 1.66992 29.9004 2.29688 29.9004 3.05859C29.9004 3.83203 29.6367 4.46484 29.1094 4.95703C28.5938 5.44922 27.9082 5.69531 27.0527 5.69531C26.1973 5.69531 25.5059 5.44922 24.9785 4.95703C24.4629 4.46484 24.2051 3.83203 24.2051 3.05859Z"
				fill="white"
			/>
		</svg>
	);
};

export default ThinkIt;
