import { CssBaseline } from "@material-ui/core";
import Head from "next/head";
import React, { useEffect } from "react";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);
	return (
		<>
			<Head>
				<title>ThinkIt!</title>
      </Head>
      <CssBaseline />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
