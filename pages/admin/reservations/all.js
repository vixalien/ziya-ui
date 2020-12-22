import Head from "next/head";
import PouchDB from "pouchdb";

export default function Home({ docs }) {
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
				<table id="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Names</th>
							<th>Phone</th>
							<th>Email</th>
							<th>Gender</th>
							<th>Number of People</th>
							<th>Location</th>
							<th>Time Registered</th>
						</tr>
					</thead>
					<tbody>
						{docs.rows.map(({ doc }, id) => (
							<tr key={"doc-" + id}>
								<td>{doc._id}</td>
								<td>{doc.names}</td>
								<td>{doc.phone}</td>
								<td>{doc.email}</td>
								<td>{doc.gender}</td>
								<td>{doc.noPeople}</td>
								<td>
									{doc.country} -{" "}
									{doc.country == "Rwanda"
										? doc.province + " " + doc.district + " " + doc.sector
										: doc.specific_country}
								</td>
								<td>{new Date(doc.time).toLocaleString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
}

export async function getServerSideProps({ query, req }) {
	let db = new PouchDB(process.env.DB_URL + "/reservations-test2");
	return {
		props: {
			docs: await db.allDocs({ include_docs: true }),
		},
	};
}
