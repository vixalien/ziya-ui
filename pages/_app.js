import Head from "next/head";

import "styles/variables.css";
import "styles/lightTheme.css";
import "styles/louis.css";
import "styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link
					rel="preload"
					href="/fonts/inter.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, maximum-scale=5, width=device-width, shrink-to-fit=no, user-scalable=yes, viewport-fit=cover"
				/>
			</Head>
			<>
				<noscript>
					<h1>Javascript is disabled</h1>
					<p>To use ZIYA, you must enable Javascript or upgrade to a browser supporting Javascript</p>
				</noscript>
				<Component {...pageProps} />
			</>
		</>
	);
}

export default MyApp;
