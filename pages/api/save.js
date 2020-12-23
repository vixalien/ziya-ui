import PouchDB from "pouchdb";

import variables from "lib/variables";

export default async (req, res) => {
	let db = new PouchDB(variables.dbs.config);

	try {
		JSON.parse(req.body);
	} catch (e) {
		res.statusCode = 400;
		return res.json({
			ok: false,
			message: "request body is absent or invalid",
		});
	}

	let body = JSON.parse(req.body);

	if (typeof body.dates != "object" || typeof body.places != "number") {
		res.statusCode = 400;
		return res.json({
			ok: false,
			message: "Dates is not a number or Places is not an object",
		});
	}

	await db
		.get("0")
		.then((doc) =>
			db.put({
				_id: "0",
				_rev: doc._rev,
				places: body.places,
				dates: body.dates,
			})
		)
		.then(() => {
			res.statusCode = 200;
			return res.json({ ok: true });
		})
		.catch((err) => {
			res.statusCode = 500;
			return res.json({ ok: false, message: err });
		});
};
