import Head from "next/head";
import PouchDB from "pouchdb";

export default function Home({ docs }) {
	return (
		<main>
			<Head>
				<title>Kibeho Sanctuary</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Hello</h1>
			<div>
				Data:{" "}
				<table>
					<thead>
						<tr>
							<th>Names</th>
							<th>Phone</th>
							<th>Location</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{docs.rows.map(({ doc }, id) => (
							<tr key={"doc-" + id}>
								<td>{doc.names}</td>
								<td>{doc.phone}</td>
								<td>{doc.country} - {doc.country == "Rwanda" ? (doc.province + ' ' + doc.district + ' ' + doc.sector) : doc.specific_country}</td>
								<td></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
}

export async function getServerSideProps({ query, req }) {
	let db = new PouchDB(process.env.DB_URL + "/reservations-test");
	return {
		props: {
			docs: await db.allDocs({ include_docs: true }),
		},
	};
}
