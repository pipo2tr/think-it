import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
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

	const client = new ApolloClient({
		uri: "http://localhost:5000/graphql",
		cache: new InMemoryCache(),
		credentials: "include"
	});
	return (
		<>	<ApolloProvider client={client}>
			<Head>
				<title>ThinkIt!</title>
			</Head>
			<CssBaseline />
			<Component {...pageProps} />
			</ApolloProvider>
		</>
	);
}

export default MyApp;
