import PouchDB from "pouchdb";

let generateForThisWeek = () => {
	let dates = {};
	let now = Date.parse(
		new Date(new Date(Date.now()).toDateString() + " 00:00")
	);
	let afterweek = now + 1000 * 60 * 60 * 24 * 7;
	while (now != afterweek) {
		dates[now] =
			new Date(now).getDay() == 0
				? ["07:00", "10:30", "15:30"]
				: ["06:00", "15:30"];
		now = now + 1000 * 60 * 60 * 24;
	}
	return dates;
};

let loadConfig = async (req, res) => {
	let db = new PouchDB(process.env.DB_URL + "/base-config");
	await db.allDocs().then(async (docs) => {
		if (docs.total_rows == 0) {
			await db.put({ _id: "0", dates: generateForThisWeek(), places: 300 });
		}
	});
	return await db.get("0");
};

export default loadConfig;
