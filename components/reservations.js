let Reservations = ({ reservations }) => {
	return (
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
				{reservations.map((doc, id) => (
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
						<td>{new Date(doc.timeRegistered).toLocaleString()}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
};

export default Reservations;