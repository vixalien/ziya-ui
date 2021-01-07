import Head from "next/head";
import { allReservations } from "utils/fn/db";

import variables from "lib/variables";

import Reservations from "components/reservations";

export default function Home({ docs }) {
	console.log("reservations", docs);
	return (
		<main>
			<Head>
				<title>Kibeho Sanctuary</title>
				<link rel="icon" href="/favicon.ico" />
				<script type="text/javascript" src="/sorttable.js"></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
            window.onload = () => sorttable.makeSortable(document.getElementById("table"))
          `,
					}}
				/>
			</Head>
			<h1>Kibeho Sanctuary</h1>
			<h2>Registered Members</h2>
			<div>
				Data:{" "}
				<Reservations reservations={docs}/>
			</div>
		</main>
	);
}

export async function getServerSideProps({ query, req }) {
	return {
		props: {
			docs: await allReservations().then(r => r.docs),
		},
	};
}
